import { CalendarEvent } from "@/services/events-service";
import { Language, Translated } from "@/types/language";
import DateIcon from "./date-icon";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoTimerOutline,
} from "react-icons/io5";
import { getDurationString, getEventTimeString } from "@/utils/date-utils";

export default function CalendarEvent(
  props: CalendarEvent & { language: Language }
) {
  return (
    <Accordion>
      <AccordionSummary
        id="panel-header"
        aria-controls="panel-content"
        className="flex flex-row py-2 px-4"
      >
        <DateIcon language={props.language} datetimeIso={props.start} />
        <div className="flex flex-col flex-grow">
          <h2>{props.name}</h2>
          <div>
            <TimeString {...props} />
            <DurationString {...props} />
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-4">
        <LocationString {...props} />
        <p dangerouslySetInnerHTML={{ __html: props.description }} />
      </AccordionDetails>
    </Accordion>
  );
}

const translations: { [key: string]: Translated<string> } = {
  time: { en: "Time", se: "Áigi" },
  duration: { en: "Duration", se: "Bistu" },
  location: { en: "Location", se: "Sadji" },
};

function TimeString({
  start,
  end,
  duration,
  language,
}: {
  start: string;
  end: string;
  duration: string;
  language: Language;
}) {
  const time = getEventTimeString(start, end, duration);
  return time != null ? (
    <div
      className="flex flex-row items-center gap-2"
      aria-label={`${translations.time[language]}: ${time}`}
    >
      <IoTimeOutline size={18} aria-hidden="true" />
      <span aria-hidden="true">{time}</span>
    </div>
  ) : null;
}

function DurationString({
  duration,
  language,
}: {
  duration: string;
  language: Language;
}) {
  const durationString = getDurationString(duration, language);
  return durationString != null ? (
    <div
      className="flex flex-row items-center gap-2"
      aria-label={`${translations.duration[language]}: ${durationString}`}
    >
      <IoTimerOutline size={18} aria-hidden="true" />
      <span aria-hidden="true">{durationString}</span>
    </div>
  ) : null;
}

function LocationString({
  location,
  language,
}: {
  location: string;
  language: Language;
}) {
  return location != null && location !== "" ? (
    <div
      className="flex flex-row items-center gap-2"
      aria-label={`${translations.location[language]}: ${location}`}
    >
      <IoLocationOutline size={20} aria-hidden="true" />
      <span aria-hidden="true">{location}</span>
    </div>
  ) : null;
}
