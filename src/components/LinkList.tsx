import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { Link } from '../types';
import { links } from '../services/api';
import { Trash2, GripVertical, AlertCircle, Loader } from 'lucide-react';

interface LinkListProps {
  links: Link[];
  updateLinks: (links: Link[]) => void;
  deleteLink: (id: string) => Promise<void>;
  incrementClicks: (id: string) => Promise<void>;
  deleteAllLinks: () => Promise<void>;
}

const LinkList: React.FC<LinkListProps> = ({ links: linksList, updateLinks, deleteLink, incrementClicks, deleteAllLinks }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log("Links received in LinkList:", linksList);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(linksList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property for each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    updateLinks(updatedItems);

    // Save new order to backend
    try {
      await links.reorder(updatedItems.map(item => item._id));
    } catch (err) {
      console.error('Failed to update link order:', err);
      setErrorMessage('Failed to update link order. Please try again.');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("Invalid link ID:", id);
      return;
    }
  
    try {
      console.log("Deleting link with ID:", id);
      setIsDeleting(id);
      
      await deleteLink(id);  // API call
  
      // Ensure only the correct link is removed
      const updatedLinks = linksList.filter(link => link._id !== id);
      updateLinks(updatedLinks);
  
      setErrorMessage(null);
    } catch (error) {
      console.error('Error deleting link:', error);
      setErrorMessage('Failed to delete link. Please try again.');
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsDeleting(null);
    }
  };
  


  const handleDeleteAll = async () => {
    try {
      setIsDeletingAll(true);
      await deleteAllLinks();
      updateLinks([]);  // Clear the links locally as fallback
      setShowDeleteConfirm(false);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error deleting all links:', error);
      setErrorMessage('Failed to delete all links. Please try again.');
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsDeletingAll(false);
    }
  };

  if (linksList.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No links added yet. Add your first link above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      
      {/* Delete All Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          disabled={isDeletingAll}
        >
          {isDeletingAll ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          Delete All Links
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Delete All Links</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete all links? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isDeletingAll}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                disabled={isDeletingAll}
              >
                {isDeletingAll ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete All'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="links">
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {linksList.map((link, index) => (
                <Draggable key={link._id} draggableId={link._id} index={index}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        backgroundColor: link.backgroundColor || '#ffffff',
                        ...provided.draggableProps.style
                      }}
                      className="relative flex items-center p-4 rounded-lg shadow-sm border border-gray-200 group"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="mr-3 text-gray-400 hover:text-gray-600"
                      >
                        <GripVertical size={20} />
                      </div>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow"
                        style={{ color: link.textColor || '#000000' }}
                        onClick={() => incrementClicks(link._id)}
                      >
                        <h3 className="font-medium">{link.title}</h3>
                        <p className="text-sm opacity-75 truncate">{link.url}</p>
                      </a>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {link.clicks} clicks
                        </span>
                      
<button
onClick={() => {
  console.log("Link object before deletion:", link);  // ✅ Debugging step
  handleDelete(link._id);
}}
className="p-2 text-gray-400 hover:text-red-500 transition-colors"
disabled={isDeleting === link._id}
>
{isDeleting === link._id ? (
  <Loader size={18} className="animate-spin" />
) : (
  <Trash2 size={18} />
)}
</button>

                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default LinkList;