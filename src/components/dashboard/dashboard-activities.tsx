"use client";

import { useDashboardActivities, useDashboardEvents } from "@/hooks/use-dashboard";
import { Loading } from "@/components/common/loading";
import { ActivityTimeline } from "@/components/common/activity-timeline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export function DashboardActivitiesAndEvents() {
  const { data: activities, isPending: activitiesPending } = useDashboardActivities();
  const { data: events, isPending: eventsPending } = useDashboardEvents();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activities
          </CardTitle>
          <CardDescription>Latest actions in your school</CardDescription>
        </CardHeader>
        <CardContent>
          <Loading isLoading={activitiesPending}>
            <ActivityTimeline activities={activities || []} />
          </Loading>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Events
          </CardTitle>
          <CardDescription>Scheduled dates and meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <Loading isLoading={eventsPending}>
            <div className="space-y-4">
              {events && events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 rounded-lg border border-slate-200 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <Calendar className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-950">{event.title}</p>
                      <p className="text-sm text-slate-600">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                        {event.type.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No upcoming events</p>
              )}
            </div>
          </Loading>
        </CardContent>
      </Card>
    </div>
  );
}
