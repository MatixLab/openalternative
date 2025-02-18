import type { SVGAttributes } from "react"
import { cx } from "~/utils/cva"

export const BrandHackerNewsIcon = ({ className, ...props }: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label="HackerNews Icon"
      className={cx("brand", className)}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M8 7l4 6l4 -6" />
      <path d="M12 17l0 -4" />
    </svg>
  )
}
