import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, UploadCloud, MapPin, Moon, Sun } from 'lucide-react';
import { Input } from "@/components/ui/input";
import clsx from 'clsx';

const formatTime = (time) => time.replace(/(\d{1,2}:\d{2}) (AM|PM)/g, (match, t, p) => `${t} ${p === 'AM' ? '🌅' : '🌇'}`);

const itinerary = [...];  // Recorta por brevedad

export default function TravelPlanner() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [fileUploads, setFileUploads] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [emojiReactions, setEmojiReactions] = useState({});

  const handleFileUpload = (event, activityTitle) => {
    const file = event.target.files[0];
    if (file) {
      setFileUploads({ ...fileUploads, [activityTitle]: file.name });
    }
  };

  const handleAddComment = (title) => {
    if (!newComments[title]?.name || !newComments[title]?.text) return;
    setComments({
      ...comments,
      [title]: [...(comments[title] || []), { name: newComments[title].name, text: newComments[title].text } ]
    });
    setNewComments({ ...newComments, [title]: { name: '', text: '' } });
  };

  const handleEmoji = (title, emoji) => {
    const count = (emojiReactions[title]?.[emoji] || 0) + 1;
    setEmojiReactions({
      ...emojiReactions,
      [title]: { ...emojiReactions[title], [emoji]: count }
    });
  };

  const selectedDay = itinerary[selectedDayIndex];

  return (
    <div className={clsx("max-w-5xl mx-auto p-6 min-h-screen", darkMode ? "bg-gray-900 text-white" : "bg-white text-black")}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">🌍 Viaje a Roma - Mayo 2025</h1>
        <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</Button>
      </div>

      <div className="flex gap-4 overflow-x-auto mb-6">
        {itinerary.map((day, idx) => (
          <Button key={idx} variant={idx === selectedDayIndex ? "default" : "outline"} onClick={() => setSelectedDayIndex(idx)} className="whitespace-nowrap">
            {day.day}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {selectedDay.image && <img src={selectedDay.image} alt="Imagen del día" className="w-full rounded-2xl shadow-md" />}
        {selectedDay.description && <p className="text-md italic opacity-80">{selectedDay.description}</p>}

        {selectedDay.activities.map((act, i) => (
          <Card key={i} className={clsx("p-4 shadow-md border", darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200")}>
            <CardContent className="space-y-2">
              <div className="text-lg font-semibold flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                {act.title} <span className="text-sm font-normal opacity-60">({formatTime(act.time)})</span>
              </div>
              {act.location && <div className="flex items-center gap-2 text-sm text-blue-500"><MapPin className="w-4 h-4" /><a href={act.location} target="_blank" rel="noopener noreferrer" className="underline">Ver en Google Maps</a></div>}
              <div className="text-sm">{act.type}</div>
              {act.comments && <div className="text-sm opacity-80">💬 {act.comments}</div>}
              {act.image && <img src={act.image} alt={act.title} className="w-full rounded-md" />}
              {act.info && <p className="text-sm opacity-90">{act.info}</p>}

              <div className="flex items-center gap-2 mt-2">
                <Input type="file" onChange={(e) => handleFileUpload(e, act.title)} />
                <UploadCloud className="w-5 h-5" />
                {fileUploads[act.title] && <span className="text-xs text-green-500">📎 {fileUploads[act.title]}</span>}
              </div>

              <div className="mt-3 space-y-1">
                <div className="flex gap-1">
                  {["👍", "😍", "😂", "🎉"].map((emoji) => (
                    <Button variant="ghost" size="sm" key={emoji} onClick={() => handleEmoji(act.title, emoji)}>
                      {emoji} {emojiReactions[act.title]?.[emoji] || 0}
                    </Button>
                  ))}
                </div>
                <div className="mt-2">
                  <Input placeholder="Tu nombre" value={newComments[act.title]?.name || ''} onChange={(e) => setNewComments({ ...newComments, [act.title]: { ...newComments[act.title], name: e.target.value } })} className="mb-1" />
                  <Input placeholder="Añade un comentario" value={newComments[act.title]?.text || ''} onChange={(e) => setNewComments({ ...newComments, [act.title]: { ...newComments[act.title], text: e.target.value } })} className="mb-1" />
                  <Button size="sm" onClick={() => handleAddComment(act.title)}>Enviar comentario</Button>
                </div>
                {comments[act.title] && comments[act.title].map((c, ci) => (
                  <div key={ci} className="text-sm text-gray-600 mt-1">
                    <strong>{c.name}:</strong> {c.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}