
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Users, 
  Share, MessageSquare, Settings, Volume2, VolumeX 
} from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  participants: string[];
  startTime: string;
  status: 'scheduled' | 'active' | 'ended';
}

export const InternalMeetings = () => {
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [meetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Daily Standup',
      participants: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
      startTime: '9:00 AM',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Project Review',
      participants: ['Team Lead', 'Project Manager'],
      startTime: '2:00 PM', 
      status: 'active'
    }
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInMeeting && isVideoOn) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Error accessing camera:', err));
    }
  }, [isInMeeting, isVideoOn]);

  const joinMeeting = () => {
    setIsInMeeting(true);
    setShowJoinDialog(false);
  };

  const leaveMeeting = () => {
    setIsInMeeting(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  if (isInMeeting) {
    return (
      <Card className="w-full h-96">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Internal Meeting
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative bg-black rounded-lg h-48 flex items-center justify-center">
            {isVideoOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center text-white">
                <VideoOff className="h-12 w-12 mb-2" />
                <span>Camera Off</span>
              </div>
            )}
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button
                variant={isMuted ? "destructive" : "secondary"}
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <Button
                variant={isVideoOn ? "secondary" : "destructive"}
                size="sm"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              
              <Button
                variant={isSpeakerOn ? "secondary" : "destructive"}
                size="sm"
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              >
                {isSpeakerOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4" />
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={leaveMeeting}
              >
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>3 participants</span>
            </div>
            <span className="text-muted-foreground">Meeting ID: 123-456-789</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Internal Meetings</h3>
        <Button onClick={() => setShowJoinDialog(true)}>
          <Video className="h-4 w-4 mr-2" />
          Start Meeting
        </Button>
      </div>

      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{meeting.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {meeting.participants.join(', ')} • {meeting.startTime}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={meeting.status === 'active' ? 'default' : 'secondary'}
                    className={meeting.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {meeting.status}
                  </Badge>
                  <Button 
                    size="sm" 
                    onClick={joinMeeting}
                    disabled={meeting.status === 'ended'}
                  >
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showJoinDialog && (
        <Dialog open={true} onOpenChange={setShowJoinDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Meeting</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Meeting ID</label>
                <Input placeholder="Enter meeting ID or start new meeting" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={joinMeeting}>Join Meeting</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
