"use strict";
import { Project } from "./classes";

export const projects = [];
export let currentProject;

export function createProject(title) {
  const project = new Project(title);
  projects.push(project);
  currentProject = project;
  return project;
}
