import React from 'react';
import { TaskStatus } from '../types';
import musicWireframeImg from '../assets/images/music_wireframe_1785924055313.jpg';
import uizardFoodImg from '../assets/images/uizard_food_app_1785924074993.jpg';
import dunePosterImg from '../assets/images/dune_movie_poster_1785924090984.jpg';
import { X, FolderArchive, FileText, Download, CheckCircle, Image as ImageIcon, Code, Copy, Check } from 'lucide-react';

interface AssignmentFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: TaskStatus[];
}

export const AssignmentFolderModal: React.FC<AssignmentFolderModalProps> = ({ isOpen, onClose, tasks }) => {
  const [copiedLog, setCopiedLog] = React.useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const summaryText = `ASSIGNMENT SUBMISSION REPORT
----------------------------------
Task 1: Figma AI Music Wireframe -> ${tasks.find((t) => t.id === 'task1')?.uploadedArtifact}
Task 2: Uizard Food Delivery App Prototype -> ${tasks.find((t) => t.id === 'task2')?.uploadedArtifact}
        Surprising Feature Note: ${tasks.find((t) => t.id === 'task2')?.notes}
Task 3: Figma to Code Verification -> ${tasks.find((t) => t.id === 'task3')?.uploadedArtifact}
Task 4: Pure HTML & CSS BookMyShow Movie Card -> ${tasks.find((t) => t.id === 'task4')?.uploadedArtifact}
Task 5: Design-to-Code Handoff Workflow -> ${tasks.find((t) => t.id === 'task5')?.uploadedArtifact}
----------------------------------
Status: ALL 5 TASKS COMPLETED SUCCESSFULLY.`;

    navigator.clipboard.writeText(summaryText);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Assignment Repository Folder</h2>
              <p className="text-xs text-slate-400 font-mono">/assignment_folder/submission_v1/</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Artifact List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Exported Assignment Artifacts & Files:
          </h3>

          <div className="space-y-3">
            {/* Task 1 Artifact */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <ImageIcon className="w-8 h-8 text-rose-400 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Task 1: Music Playlist Wireframe</div>
                  <div className="text-xs font-mono text-emerald-400">{tasks.find((t) => t.id === 'task1')?.uploadedArtifact}</div>
                </div>
              </div>
              <a
                href={musicWireframeImg}
                download="music_playlist_wireframe_v1.jpg"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 self-start sm:self-center"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Image</span>
              </a>
            </div>

            {/* Task 2 Artifact */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <ImageIcon className="w-8 h-8 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">Task 2: Uizard Food Delivery Prototype</div>
                    <div className="text-xs font-mono text-emerald-400">{tasks.find((t) => t.id === 'task2')?.uploadedArtifact}</div>
                  </div>
                </div>
                <a
                  href={uizardFoodImg}
                  download="uizard_food_delivery_prototype.jpg"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 self-start sm:self-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Prototype</span>
                </a>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-amber-300 block mb-1">Surprising Feature Note:</span>
                <p className="italic text-slate-400">{tasks.find((t) => t.id === 'task2')?.notes}</p>
              </div>
            </div>

            {/* Task 3 Artifact */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <Code className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Task 3: Figma to Code Verification Export</div>
                  <div className="text-xs font-mono text-emerald-400">figma_to_code_verified.html</div>
                </div>
              </div>
              <span className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-xl">
                Verified in Sandbox
              </span>
            </div>

            {/* Task 4 Artifact */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <Code className="w-8 h-8 text-rose-400 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Task 4: BookMyShow Movie Card Pure HTML/CSS</div>
                  <div className="text-xs font-mono text-emerald-400">bookmyshow_movie_card_pure_html_css.zip</div>
                </div>
              </div>
              <span className="text-xs bg-rose-500/10 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-xl font-bold">
                100% HTML/CSS (No JS)
              </span>
            </div>

            {/* Task 5 Artifact */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Task 5: Design-to-Code Handoff Workflow Guide</div>
                  <div className="text-xs font-mono text-emerald-400">design_to_code_handoff_workflow_guide.md</div>
                </div>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold">
                5 Steps + Tools Included
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopySummary}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition"
          >
            {copiedLog ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
            <span>{copiedLog ? 'Copied Log!' : 'Copy Assignment Submission Log'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-500/20"
          >
            Close Folder View
          </button>
        </div>
      </div>
    </div>
  );
};
