import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // DICE Framework variants
        defend: "bg-dice-defend text-dice-defend-foreground hover:bg-dice-defend/90 shadow-dice",
        investigate: "bg-dice-investigate text-dice-investigate-foreground hover:bg-dice-investigate/90",
        contain: "bg-dice-contain text-dice-contain-foreground hover:bg-dice-contain/90",
        evolve: "bg-dice-evolve text-dice-evolve-foreground hover:bg-dice-evolve/90",
        hero: "bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow",
        gradient: "bg-gradient-dice text-primary hover:opacity-90 shadow-elevated"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariant = NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
export type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>["size"];