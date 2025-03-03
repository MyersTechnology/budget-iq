
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & React.CSSProperties
>(({ className, value, style, ...props }, ref) => {
  // Extract --progress-background from style if provided
  const indicatorStyle: React.CSSProperties = {};
  if (style && '--progress-background' in style) {
    indicatorStyle.background = style['--progress-background'] as string;
    // Remove it from style to avoid passing it to the root element
    const { ['--progress-background']: _, ...restStyle } = style;
    style = restStyle;
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      style={style}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 transition-all"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          ...indicatorStyle
        }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
