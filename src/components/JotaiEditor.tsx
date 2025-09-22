import React, { useState, useCallback, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { JsonEditor } from "json-edit-react";
import {
  Edit3,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Download,
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { initialJsonData, isEditingAtom, jsonDataAtom } from "@/lib/utils";

const viewModeAtom = atom("tree"); // 'tree' or 'code'

const JSONEditor = () => {
  const [jsonData, setJsonData] = useAtom(jsonDataAtom);
  const [isEditMode, setIsEditMode] = useAtom(isEditingAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show notification helper
  const showNotification = useCallback((message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Update data to API
  const updateData = useCallback(
    async (data) => {
      setIsSaving(true);
      try {
        const response = await fetch("https://api.techdarshak.com/updateData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        showNotification("Data saved successfully", "success");
        // Fetch fresh data after successful update
        await fetchData();
      } catch (error) {
        console.error("Error updating data:", error);
        showNotification(`Failed to save data: ${error.message}`, "error");
      } finally {
        setIsSaving(false);
      }
    },
    [showNotification]
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.techdarshak.com/getData");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Keep existing data on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataChange = useCallback(
    (data) => {
      setJsonData(data);
    },
    [setJsonData]
  );

  const handleSave = useCallback(() => {
    updateData(jsonData);
  }, [jsonData, updateData]);

  const handleReset = useCallback(() => {
    fetchData();
    setIsEditMode(false);
  }, [fetchData, setIsEditMode]);

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "data.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }, [jsonData]);

  const handleImport = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedData = JSON.parse(e.target.result);
            setJsonData(importedData);
            showNotification("File imported successfully", "success");
          } catch (error) {
            showNotification("Invalid JSON file", "error");
          }
        };
        reader.readAsText(file);
      }
      // Reset the input
      event.target.value = "";
    },
    [setJsonData, showNotification]
  );

  const getObjectStats = (obj) => {
    const jsonStr = JSON.stringify(obj);
    return {
      keys: Object.keys(obj).length,
      size: new Blob([jsonStr]).size,
      depth: getMaxDepth(obj),
    };
  };

  const getMaxDepth = (obj, depth = 0) => {
    if (obj === null || typeof obj !== "object") return depth;
    return Math.max(
      depth,
      ...Object.values(obj).map((v) => getMaxDepth(v, depth + 1))
    );
  };

  const stats = getObjectStats(jsonData);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`flex items-center px-4 py-3 rounded-lg shadow-lg max-w-sm ${
              notification.type === "success"
                ? "bg-green-600 text-white"
                : notification.type === "error"
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {notification.type === "success" && (
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            )}
            {notification.type === "error" && (
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            )}
            <span className="text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <div
          className={`rounded-lg shadow-lg transition-colors duration-200 ${
            isDarkTheme
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          {/* Header */}
          <div
            className={`border-b p-6 transition-colors duration-200 ${
              isDarkTheme ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1
                  className={`text-2xl font-bold transition-colors duration-200 ${
                    isDarkTheme ? "text-white" : "text-gray-900"
                  }`}
                >
                  JSON Editor
                </h1>
                {isLoading && (
                  <div className="flex items-center">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
                    <span
                      className={`text-sm ${
                        isDarkTheme ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Loading...
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {/* View Mode Toggle */}
                <button
                  onClick={() =>
                    setViewMode(viewMode === "tree" ? "code" : "tree")
                  }
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isDarkTheme
                      ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {viewMode === "tree" ? (
                    <Eye className="w-4 h-4 mr-1" />
                  ) : (
                    <EyeOff className="w-4 h-4 mr-1" />
                  )}
                  {viewMode === "tree" ? "Code View" : "Tree View"}
                </button>

                {/* Edit Mode Toggle */}
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                    isEditMode
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  {isEditMode ? "View Mode" : "Edit Mode"}
                </button>

                {/* Save Button */}
                {isEditMode && (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 rounded-md transition-colors"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-1" />
                    )}
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                )}

                {/* File Operations */}
                <div className="flex space-x-2">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                    id="json-file-input"
                  />
                  <label
                    htmlFor="json-file-input"
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                      isDarkTheme
                        ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                        : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Import
                  </label>

                  <button
                    onClick={handleExport}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isDarkTheme
                        ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                        : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </button>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  disabled={isLoading}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isDarkTheme
                      ? "text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50"
                  }`}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div
              className={`flex items-center justify-between mt-4 text-sm ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex items-center space-x-6">
                <span>Mode: {isEditMode ? "Editing" : "Read-only"}</span>
                <span>View: {viewMode === "tree" ? "Tree" : "Code"}</span>
                <span>Keys: {stats.keys}</span>
                <span>Size: {stats.size} bytes</span>
                <span>Depth: {stats.depth} levels</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>🔄 API Connected</span>
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* JSON Editor */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p
                    className={`text-lg ${
                      isDarkTheme ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Loading JSON data...
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="border rounded-lg overflow-hidden"
                style={{ minHeight: "500px" }}
              >
                <JsonEditor
                  data={jsonData}
                  setData={handleDataChange}
                  restrictEdit={!isEditMode}
                  restrictDelete={!isEditMode}
                  restrictAdd={!isEditMode}
                  restrictDrag={!isEditMode}
                  restrictTypeSelection={!isEditMode}
                  showErrorMessages={true}
                  showStringQuotes={true}
                  showCollectionCount={true}
                  enableClipboard={true}
                  indent={2}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className={`border-t px-6 py-4 transition-colors duration-200 ${
              isDarkTheme
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div
              className={`flex justify-between items-center text-sm ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex space-x-4">
                <span>📊 Real-time validation</span>
                <span>🎨 Syntax highlighting</span>
                <span>📁 Import/Export support</span>
                <span>🔧 Full edit capabilities</span>
                <span>🌐 API Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                {isSaving && (
                  <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                )}
                <span>Connected to api.techdarshak.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONEditor;
