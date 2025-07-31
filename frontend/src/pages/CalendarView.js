
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import api from '../setupAxios';
import { useEffect, useState } from 'react';
import '../style/CalendarView.css';

const eventTypeLabels = {
  collaboration_start: 'Collaboration Start',
  collaboration_end: 'Collaboration End',
  followup: 'Follow-up',
  delivery_deadline: 'Delivery Deadline',
};

const eventColors = {
  collaboration_start: '#1E90FF',
  collaboration_end: '#FF4C4C',
  followup: '#FFA500',
  delivery_deadline: '#32CD32',
};

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/api/calendar-view`);
      setEvents(response.data.events);
    };
    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event.extendedProps);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter((event) => {
    const brandMatch = brandFilter ? event.title.includes(brandFilter) : true;
    const typeMatch = eventTypeFilter ? event.type === eventTypeFilter : true;
    return brandMatch && typeMatch;
  });

  const brands = [...new Set(events.map((e) => e.title.split(' - ')[0]))];

  return (
    <Box p={3}>
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item>
          {Object.entries(eventColors).map(([key, color]) => (
            <Chip key={key} label={eventTypeLabels[key]} style={{ backgroundColor: color, color: '#fff', marginRight: '8px' }} />
          ))}
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel>Event Type</InputLabel>
            <Select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              label="Event Type"
              style={{ minWidth: 150 }}
            >
              <MenuItem value="">All</MenuItem>
              {Object.keys(eventTypeLabels).map((type) => (
                <MenuItem key={type} value={type}>{eventTypeLabels[type]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel>Brand</InputLabel>
            <Select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              label="Brand"
              style={{ minWidth: 150 }}
            >
              <MenuItem value="">All</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>{brand}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        height="auto"
        events={filteredEvents.map((e) => ({
          title: e.title,
          date: e.date,
          backgroundColor: eventColors[e.type],
          borderColor: eventColors[e.type],
          extendedProps: {
            ...e
          }
        }))}
        eventClick={handleEventClick}
        eventDisplay="block"
      />

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="xs"
        fullWidth
        >
        <DialogTitle sx={{ m: 0, p: 2 }}>
            {selectedEvent?.title}
            <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        </DialogTitle>

        <DialogContent dividers>
            {selectedEvent && (
            <>
                <Typography gutterBottom>
                <b>Date:</b> {selectedEvent.date}
                </Typography>
                <Typography gutterBottom>
                <b>Event:</b> {eventTypeLabels[selectedEvent.type]}
                </Typography>
                <Typography mt={1}>
                This {eventTypeLabels[selectedEvent.type]?.toLowerCase()} is scheduled for {selectedEvent.date}.
                </Typography>
            </>
            )}
        </DialogContent>
        </Dialog>

    </Box>
  );
};

export default CalendarView;
