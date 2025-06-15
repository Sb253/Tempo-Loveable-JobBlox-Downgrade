
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Job } from "@/components/SchedulingDashboard";

interface DragDropCalendarProps {
  jobs: Job[];
  view: 'month' | 'week' | 'day';
  onJobMove: (jobId: string, newDate: string, newTime?: string) => void;
  onJobSelect: (job: Job) => void;
  jobTypeColors: Record<string, string>;
}

export const DragDropCalendar = ({ 
  jobs, 
  view, 
  onJobMove, 
  onJobSelect, 
  jobTypeColors 
}: DragDropCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getJobsForDate = (date: string) => {
    return jobs.filter(job => job.startDate === date);
  };

  const getDaysInView = () => {
    if (view === 'day') {
      return [selectedDate.toISOString().split('T')[0]];
    }
    
    if (view === 'week') {
      const startOfWeek = new Date(selectedDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day;
      startOfWeek.setDate(diff);
      
      const days = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        days.push(date.toISOString().split('T')[0]);
      }
      return days;
    }

    // Month view - simplified to show current week
    return getDaysInView(); // This would be expanded for full month
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newDate = destination.droppableId;
    
    onJobMove(draggableId, newDate);
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5); // Convert "09:00:00" to "09:00"
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const renderDayView = () => {
    const date = selectedDate.toISOString().split('T')[0];
    const dayJobs = getJobsForDate(date);
    const timeSlots = getTimeSlots();

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <div className="space-y-2">
              {timeSlots.map(time => (
                <div key={time} className="h-16 flex items-center text-sm text-muted-foreground">
                  {time}
                </div>
              ))}
            </div>
            
            <Droppable droppableId={date}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-2 min-h-[400px] border-2 border-dashed rounded-lg p-4 ${
                    snapshot.isDraggingOver ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  {dayJobs.map((job, index) => (
                    <Draggable key={job.id} draggableId={job.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`cursor-pointer transition-all ${
                            snapshot.isDragging ? 'shadow-lg scale-105' : 'hover:shadow-md'
                          }`}
                          onClick={() => onJobSelect(job)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-3 h-3 rounded ${jobTypeColors[job.jobType]}`}></div>
                              <span className="font-medium text-sm">{job.title}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(job.startTime)} - {job.endTime ? formatTime(job.endTime) : 'Open'}
                              </div>
                              <div>{job.customer}</div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getDaysInView();
    
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Week View</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - 7);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + 7);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map(date => {
              const dayJobs = getJobsForDate(date);
              const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
              const dayNumber = new Date(date).getDate();

              return (
                <div key={date} className="space-y-2">
                  <div className="text-center">
                    <div className="text-sm font-medium">{dayName}</div>
                    <div className="text-lg">{dayNumber}</div>
                  </div>
                  
                  <Droppable droppableId={date}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] border-2 border-dashed rounded-lg p-2 ${
                          snapshot.isDraggingOver ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        {dayJobs.map((job, index) => (
                          <Draggable key={job.id} draggableId={job.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-2 cursor-pointer transition-all ${
                                  snapshot.isDragging ? 'shadow-lg scale-105' : 'hover:shadow-md'
                                }`}
                                onClick={() => onJobSelect(job)}
                              >
                                <CardContent className="p-2">
                                  <div className="flex items-center gap-1 mb-1">
                                    <div className={`w-2 h-2 rounded ${jobTypeColors[job.jobType]}`}></div>
                                    <span className="font-medium text-xs">{job.title}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatTime(job.startTime)}
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </div>
      </DragDropContext>
    );
  };

  const renderMonthView = () => {
    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md border"
        />
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4">
            Jobs for {selectedDate.toLocaleDateString()}
          </h3>
          
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={selectedDate.toISOString().split('T')[0]}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-2 min-h-[200px] border-2 border-dashed rounded-lg p-4 ${
                    snapshot.isDraggingOver ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  {getJobsForDate(selectedDate.toISOString().split('T')[0]).map((job, index) => (
                    <Draggable key={job.id} draggableId={job.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`cursor-pointer transition-all ${
                            snapshot.isDragging ? 'shadow-lg scale-105' : 'hover:shadow-md'
                          }`}
                          onClick={() => onJobSelect(job)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-3 h-3 rounded ${jobTypeColors[job.jobType]}`}></div>
                              <span className="font-medium">{job.title}</span>
                              <Badge variant="outline">{job.status}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <div>{job.customer}</div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(job.startTime)} - {job.endTime ? formatTime(job.endTime) : 'Open'}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  };

  if (view === 'day') return renderDayView();
  if (view === 'week') return renderWeekView();
  return renderMonthView();
};
