"use client";

import { Activity } from "@/types/modules";

interface ActivityTimelineProps {
  activities: Activity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-sm text-slate-500">No activities yet</p>
      ) : (
        activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full border-2 border-primary bg-white flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              {index < activities.length - 1 && (
                <div className="h-12 w-0.5 bg-slate-200" />
              )}
            </div>
            <div className="pb-4">
              <p className="text-sm font-medium text-slate-950">{activity.action}</p>
              <p className="text-xs text-slate-500">{activity.user}</p>
              {activity.description && (
                <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
              )}
              <p className="mt-1 text-xs text-slate-400">
                {new Date(activity.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
