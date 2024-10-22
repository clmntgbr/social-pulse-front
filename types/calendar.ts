type ViewsId = "dayGridDay" | "timeGridWeek" | "dayGridMonth" | "listWeek";

export type Views = {
  index: number;
  key: ViewsId;
  label: string;
};

export const items: Views[] = [
  {
    index: 0,
    key: "dayGridDay",
    label: "Jour",
  },
  {
    index: 1,
    key: "listWeek",
    label: "Semaine",
  },
  {
    index: 2,
    key: "dayGridMonth",
    label: "Mois",
  },
];

export class Event {
  title!: string | null;
  start!: string;
  end!: string | null;
  color!: string;
  extendedProps!: { groupdUuid: string };
  overlap!: boolean;
}
