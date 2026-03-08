import { useState } from "react";
import { EventItem } from "../types";

interface Props {
  initialData?: EventItem;
  onSave: (data: Omit<EventItem, "id" | "createdAt">) => void;
  onClose: () => void;
}

export function EventModal({ initialData, onSave, onClose }: Props) {
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        title: initialData.title,
        targetDate: new Date(initialData.targetDate).toISOString().slice(0, 16),
        description: initialData.description,
        iconType: initialData.iconType,
      };
    }
    return {
      title: "",
      targetDate: "",
      description: "",
      iconType: "default" as EventItem["iconType"],
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const minDateTime = now.toISOString().slice(0, 16);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e293b] w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">
          {initialData ? "Edit Event" : "Add New Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Event Name
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              placeholder="e.g. World Cup Finals"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Target Date & Time
            </label>
            <input
              required
              type="datetime-local"
              min={minDateTime}
              value={formData.targetDate}
              onChange={(e) =>
                setFormData({ ...formData, targetDate: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 scheme-dark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 resize-none h-24"
              placeholder="Add some details..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Category / Theme
            </label>
            <select
              value={formData.iconType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  iconType: e.target.value as EventItem["iconType"],
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="default">General</option>
              <option value="flight">Travel / Vacation</option>
              <option value="work">Work / Deadlines</option>
              <option value="birthday">Birthday / Party</option>
              <option value="sports">Sports / Entertainment</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors"
            >
              {initialData ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
