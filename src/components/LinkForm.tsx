import { useState } from "react";
import { links } from "../services/api";
import ColorPickerWithProgress from "./ColorPickerWithProgress";
import { Link } from "../types"; // Import Link type

interface LinkFormProps {
  addLink: (link: Link) => void;
  deleteLink: (id: string) => void;
}

interface LinkData {
  title: string;
  url: string;
  backgroundColor?: string;
  textColor?: string;
}

const LinkForm: React.FC<LinkFormProps> = ({ addLink, deleteLink }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [error, setError] = useState("");
  const [addedLinks, setAddedLinks] = useState<Link[]>([]);

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !url) {
      setError("Please fill in all required fields");
      return;
    }

    // Add http:// if not present
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }

    try {
      // Create the link data object
      const linkData: LinkData = {
        title: title.trim(),
        url: formattedUrl,
        backgroundColor,
        textColor
      };

      // Make the API call
      const response = await links.create(linkData);
      
      if (response && response.data) {
        // Add to parent component state
        addLink(response.data);
        
        // Add to local state
        setAddedLinks([response.data, ...addedLinks]);

        // Reset form
        setTitle("");
        setUrl("");
        setBackgroundColor("#ffffff");
        setTextColor("#000000");
        setError("");
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error creating link:', err);
      setError("Error adding link. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLink(id);
      setAddedLinks(addedLinks.filter(link => link._id !== id));
    } catch (err) {
      setError("Error deleting link. Please try again.");
    }
  };

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className=" h-screen w-full p-4 sm:p-6 rounded-lg shadow-[0px_14px_35px_0px_rgba(255,255,255,0.5)]">
        <h2 className="text-lg font-semibold mb-4">Add New Link</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter link title"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ColorPickerWithProgress
              label="Background Color"
              color={backgroundColor}
              setColor={setBackgroundColor}
            />
            <ColorPickerWithProgress
              label="Text Color"
              color={textColor}
              setColor={setTextColor}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Add Link
          </button>
        </form>
      </div>

      {/* Added Links List */}
      {addedLinks.length > 0 && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recently Added Links</h3>
          <div className="space-y-3">
            {addedLinks.map((link) => (
              <div
                key={link._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
                style={{
                  backgroundColor: link.backgroundColor || '#ffffff',
                  color: link.textColor || '#000000'
                }}
              >
                <div className="overflow-hidden">
                  <h4 className="font-medium truncate">{link.title}</h4>
                  <p className="text-sm opacity-75 truncate">{link.url}</p>
                </div>
                <button
                  onClick={() => handleDelete(link._id)}
                  className="text-red-500 hover:text-red-700 p-2 self-end sm:self-center"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkForm;