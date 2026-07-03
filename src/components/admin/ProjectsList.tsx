"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { reorderProjects } from "@/actions/projects";

interface ProjectItem {
  id: string;
  title: string;
  type: string;
  category: string;
  published: boolean;
  featured: boolean;
}

function SortableRow({ project }: { project: ProjectItem }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="px-4 py-3 flex items-center gap-4 bg-surface border-b border-border"
    >
      <button
        type="button"
        className="cursor-grab text-text-secondary text-lg"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        ⠿
      </button>
      <div className="flex-1">
        <Link
          href={`/admin/projects/${project.id}`}
          className="font-medium hover:text-accent"
        >
          {project.title}
        </Link>
        <p className="text-xs text-text-secondary">
          {project.type} · {project.category}
        </p>
      </div>
      <span className="text-xs text-text-secondary">
        {project.published ? "Published" : "Draft"}
        {project.featured && " · Featured"}
      </span>
    </li>
  );
}

interface ProjectsListProps {
  projects: ProjectItem[];
}

export function ProjectsList({ projects: initial }: ProjectsListProps) {
  const [projects, setProjects] = useState(initial);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(projects, oldIndex, newIndex);
    setProjects(reordered);

    await reorderProjects(reordered.map((p) => p.id));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={projects.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="border border-border">
          {projects.map((project) => (
            <SortableRow key={project.id} project={project} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
