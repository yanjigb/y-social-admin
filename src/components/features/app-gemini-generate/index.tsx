import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useCountDown, useLocalStorageState } from 'ahooks';
import clsx from 'clsx';
import { toast } from 'sonner';
import CircularProgress from '@mui/joy/CircularProgress';
import { ENV_KEYS } from '../../../constants/env-keys';
import { ADVERTISEMENT_PROMPT } from './constant';
import { convert } from 'html-to-text';

interface Props {
  content: string;
}

export default function AppGeminiGenerate({ content }: Props) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [targetDate, setTargetDate] = useLocalStorageState<number>('geminiCooldownEnd', {
    defaultValue: 0,
  });
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => setTargetDate(0),
  });
  const formatText = convert(content)

  useEffect(() => {
    console.log(formatText);
  }, [content]);

  const generateText = async () => {
    try {
      setLoading(true);
      const genAI = new GoogleGenerativeAI(ENV_KEYS.GOOGLE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: ADVERTISEMENT_PROMPT }],
          },
        ]
      });
      const result = await chat.sendMessage(content);
      const response = await result.response;
      const sanitizedText = response.text().replace(/[^\w\s.,!?-]/g, '');

      setResponse(sanitizedText);
      setTargetDate(Date.now() + 45 * 1000);
    } catch (error) {
      toast.error('Something went wrong');
      setResponse('Error generating response. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const remainingSeconds = Math.round(countdown / 1000);

  return (
    <div className="w-full z-10">
      <button
        onClick={generateText}
        disabled={loading || !content || remainingSeconds > 0}
        className={clsx("py-1 px-2 bg-warning/10 text-black !rounded-md", {
          "cursor-not-allowed": loading || !content || remainingSeconds > 0,
          "border border-primary": !loading && content && remainingSeconds === 0,
        })}
      >
        {loading ? <div className="flex items-center gap-2">
          Generating...
          <CircularProgress
            color="primary"
            size="sm"
            variant="soft"
          />
        </div> : remainingSeconds > 0 ? `✨ Please wait ${remainingSeconds}s` : <div className="flex items-center gap-2">
          <span>✨ Generate By AI</span>
          <b className='text-primary'>BETA</b>
        </div>}
      </button>

      {response && (
        <div className="mt-4">
          <div className="w-full min-h-32 p-3 bg-gray-50 border border-gray-300 rounded-lg whitespace-pre-wrap">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};
