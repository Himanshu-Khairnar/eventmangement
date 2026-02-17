"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-2 [--cell-radius:0px] [--cell-size:2.5rem] bg-white text-black group/calendar in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none hover:bg-black hover:text-white rounded-none transition-all",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none hover:bg-black hover:text-white rounded-none transition-all",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size) font-black uppercase tracking-wide",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative cn-calendar-dropdown-root rounded-none",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-black text-lg",
          captionLayout === "label"
            ? "text-sm"
            : "cn-calendar-caption-label rounded-none flex items-center gap-1 text-sm  [&>svg]:text-black [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-black font-black uppercase rounded-none flex-1 text-[0.75rem] select-none tracking-wider",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full rounded-none h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-none group/day aspect-square select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-none"
            : "[&:first-child[data-selected=true]_button]:rounded-l-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-none bg-primary relative after:bg-primary after:absolute after:inset-y-0 after:w-4 after:right-0 z-0 isolate",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "rounded-none bg-primary relative after:bg-primary after:absolute after:inset-y-0 after:w-4 after:left-0 z-0 isolate",
          defaultClassNames.range_end
        ),
        today: cn(
          "bg-accent text-black border-2 border-black rounded-none font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
          defaultClassNames.today
        ),
        outside: cn(
          "text-gray-400 opacity-50",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("cn-rtl-flip size-4 text-black font-bold", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn("cn-rtl-flip size-4 text-black font-bold", className)} {...props} />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4 text-black", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const hasEvent = (modifiers as any).hasEvent

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "text-black data-[selected-single=true]:bg-primary data-[selected-single=true]:text-black data-[selected-single=true]:border-2 data-[selected-single=true]:border-black data-[selected-single=true]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[selected-single=true]:font-black data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-black data-[range-start=true]:border-2 data-[range-start=true]:border-black data-[range-end=true]:bg-primary data-[range-end=true]:text-black data-[range-end=true]:border-2 data-[range-end=true]:border-black group-data-[focused=true]/day:border-black group-data-[focused=true]/day:ring-black/50 hover:bg-accent hover:text-black hover:border-2 hover:border-black hover:translate-x-[2px] hover:translate-y-[2px] transition-all relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-2 border-transparent leading-none font-bold rounded-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[2px] data-[range-end=true]:rounded-none data-[range-end=true]:rounded-r-none data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-none data-[range-start=true]:rounded-l-none [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      {props.children}
      {hasEvent && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
          <div className="w-2 h-2 bg-primary rounded-full event-pulse" />
        </div>
      )}
    </Button>
  )
}

export { Calendar, CalendarDayButton }
