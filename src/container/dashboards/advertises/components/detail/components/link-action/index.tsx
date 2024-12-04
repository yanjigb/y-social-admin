import { memo, useState, useEffect } from "react"
import isEqual from "react-fast-compare"
import Skeleton from "./skeleton";
import { Link } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Input from '@mui/joy/Input';
import { CircularProgress } from "@mui/material";
import { Pencil } from "lucide-react";

import { GetById, Update } from "../../../../../../../services/ads.service";

interface Props {
  url: string;
}

const LinkAction = (props: Props) => {
  const { url } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [editedUrl, setEditedUrl] = useState(url);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const updateUrl = async (newUrl: string) => {
    if (!hasChanged) return;

    try {
      setIsLoading(true);
      await Update(id, { link_action: newUrl });

      const updatedData: any = await GetById(id);
      const newUrlFromServer = updatedData.link_action;

      setCurrentUrl(newUrlFromServer);
      setEditedUrl(newUrlFromServer);
      setHasChanged(false);
      toast.success("Updated successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentUrl(url);
    setEditedUrl(url);
  }, [url]);

  const handleSave = async () => {
    await updateUrl(editedUrl);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setEditedUrl(currentUrl);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedUrl(currentUrl);
    setIsEditing(false);
    setHasChanged(false);
  };

  const handleChange = (newUrl: string) => {
    setEditedUrl(newUrl);
    setHasChanged(true);
  };

  if (!url) return <Skeleton />

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col gap-2 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">
          Link Action
        </span>
        <Link size={16} />
      </div>

      <URLContent
        isEditing={isEditing}
        url={editedUrl}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        toggleEdit={toggleEdit}
      />
    </div>
  )
}

const URLContent = ({ isEditing, url, isLoading, handleChange, handleSave, handleCancel, toggleEdit }: { isEditing: boolean, url: string, isLoading: boolean, handleChange: (newUrl: string) => void, handleSave: () => void, handleCancel: () => void, toggleEdit: () => void }) => {
  return (
    <div className="flex flex-col gap-2">
      {isEditing ? (
        <Input value={url} onChange={(e) => handleChange(e.target.value)} placeholder="Enter link action..." />
      ) : (
        <div className="font-semibold text-sm text-wrap max-w-full truncate">
          {url}
        </div>
      )}

      <EditButton
        isLoading={isLoading}
        isEditing={isEditing}
        onClick={handleSave}
        onCancel={handleCancel}
        onEdit={toggleEdit}
      />
    </div>
  )
}

const EditButton = ({ isLoading, isEditing, onClick, onCancel, onEdit }: { isLoading: boolean, isEditing: boolean, onClick: () => void, onCancel: () => void, onEdit: () => void }) => {
  if (isLoading) {
    return <CircularProgress size={16} />
  }

  return (
    <div className="flex gap-2">
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

export default memo(LinkAction, isEqual)
