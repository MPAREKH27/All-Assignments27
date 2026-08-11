/**
 * Utils module entry point
 * Scalable helper utilities directory placeholder
 */

export * from './api.js';

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default {
  moduleName: "utils",
  description: "Scalable Helper Utilities Directory",
};
