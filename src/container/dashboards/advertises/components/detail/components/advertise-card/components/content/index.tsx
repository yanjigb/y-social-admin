import { Pencil } from "lucide-react";
import { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import ReactMarkdown from "react-markdown";
import ReactQuill from "react-quill";
import rehypeRaw from 'rehype-raw';
import { toast } from "sonner";
import { useParams } from "react-router-dom";

import { Update, GetById } from "../../../../../../../../../services/ads.service";

import { CircularProgress } from "@mui/material";
interface Props {
  description: string;
}

const Content = (props: Props) => {
  const { description } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [editedDescription, setEditedDescription] = useState(description);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    setCurrentDescription(description);
    setEditedDescription(description);
  }, [description]);

  const updateDescription = async (newDescription: string) => {
    if (!hasChanged) return;

    try {
      setIsLoading(true);
      await Update(id, { description: newDescription });

      const updatedData: any = await GetById(id);
      const newDescriptionFromServer = updatedData.description;

      setCurrentDescription(newDescriptionFromServer);
      setEditedDescription(newDescriptionFromServer);
      setHasChanged(false);
      toast.success("Updated successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    await updateDescription(editedDescription);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setEditedDescription(currentDescription);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedDescription(currentDescription);
    setIsEditing(false);
    setHasChanged(false);
  };

  const onExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (newDescription: string) => {
    setEditedDescription(newDescription);
    setHasChanged(true);
  };

  if (description.length < 100) {
    return <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-lg">
      {description}
    </ReactMarkdown>;
  }

  const renderContent = () => {
    if (isEditing) {
      return <ReactQuill
        value={editedDescription}
        onChange={handleChange}
        theme="snow"
        className="bg-gray-100 w-full"
      />;
    }

    return <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-lg">
      {isExpanded ? editedDescription : editedDescription.slice(0, 100) + "..."}
    </ReactMarkdown>;
  }

  return (
    <>
      <div className="flex justify-between items-start relative">
        {renderContent()}

        <EditButton
          isLoading={isLoading}
          isEditing={isEditing}
          onClick={handleSave}
          onCancel={handleCancel}
          onEdit={toggleEdit}
        />
      </div>

      {
        !isEditing && (
          <button
            onClick={onExpand}
            className="text-primary font-medium mt-2 focus:outline-none"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )
      }
    </>
  );
};

const EditButton = ({ isLoading, isEditing, onClick, onCancel, onEdit }: { isLoading: boolean, isEditing: boolean, onClick: () => void, onCancel: () => void, onEdit: () => void }) => {
  if (isLoading) {
    return <CircularProgress size={16} />
  }

  return (
    <div className="absolute top-[0.5rem] right-[1rem] flex gap-2">
      {isEditing ? (
        <div className="flex items-center gap-3">
          <button
            onClick={onClick}
            className="text-primary"
          >
            Save
          </button>

          <button
            onClick={onCancel}
            className="text-danger"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={onEdit}
          className="text-primary flex items-center gap-2"
        >
          <Pencil size={16} /> Edit
        </button>
      )}
    </div>
  )
}

export default memo(Content, isEqual);
