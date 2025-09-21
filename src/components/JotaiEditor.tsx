import React, { useState, useCallback } from "react";
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
} from "lucide-react";
import { initialJsonData, isEditingAtom, jsonDataAtom } from "@/lib/utils";

const viewModeAtom = atom("tree"); // 'tree' or 'code'

const JSONEditor = () => {
  const [jsonData, setJsonData] = useAtom(jsonDataAtom);
  const [isEditMode, setIsEditMode] = useAtom(isEditingAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleDataChange = useCallback(
    (data) => {
      setJsonData(data);
    },
    [setJsonData]
  );

  const handleReset = useCallback(() => {
    setJsonData(initialJsonData);
    setIsEditMode(false);
  }, [setJsonData, setIsEditMode]);

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
          } catch (error) {
            alert("Invalid JSON file");
          }
        };
        reader.readAsText(file);
      }
      // Reset the input
      event.target.value = "";
    },
    [setJsonData]
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
              {/* <div>
                <h1
                  className={`text-2xl font-bold transition-colors duration-200 ${
                    isDarkTheme ? "text-white" : "text-gray-900"
                  }`}
                >
                  JSON Editor with json-edit-react
                </h1>
                <p
                  className={`mt-1 transition-colors duration-200 ${
                    isDarkTheme ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Professional JSON editing with Jotai state management
                </p>
              </div> */}

              <div className="flex items-center space-x-3">
                {/* Theme Toggle */}
                {/* <button
                  onClick={() => setIsDarkTheme(!isDarkTheme)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isDarkTheme
                      ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {isDarkTheme ? "☀️ Light" : "🌙 Dark"}
                </button> */}

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
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isDarkTheme
                      ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            {/* <div
              className={`flex items-center mt-4 space-x-6 text-sm ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span>Mode: {isEditMode ? "Editing" : "Read-only"}</span>
              <span>View: {viewMode === "tree" ? "Tree" : "Code"}</span>
              <span>Keys: {stats.keys}</span>
              <span>Size: {stats.size} bytes</span>
              <span>Depth: {stats.depth} levels</span>
              <span>Theme: {isDarkTheme ? "Dark" : "Light"}</span>
            </div> */}
          </div>

          {/* JSON Editor */}
          <div className="p-6">
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
              </div>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONEditor;
