console.log("Polyfill - scroll-timeline call...");
// Polyfill for browsers with no Scroll-Timeline support
// We load a specific version that polyfills the old version of the spec (which uses @scroll-timeline)
// because that is how our CSS is written
import "https://rawcdn.githack.com/flackr/scroll-timeline/3063e156535f3ab1ffc8a4000ffdd3290232c121/dist/scroll-timeline.js";

// Fallback for browsers that don't support CSS ScrollTimeline
// We polyfill:
// - Browsers that support the newest version of the spec
// - Browsers that don’t support any version of the spec
if (CSS.supports("animation-timeline: scroll()") || !CSS.supports("animation-timeline: foo")) {
  // Replace warning box with info box
  document.querySelector(".warning").style.display = "none";
  document.querySelector(".info").style.display = "block";

  // As we're about to shift content out of .columns, we need it to hide its overflow
  document.querySelector(".columns").style.overflowY = "hidden";

  // Set up timeline
  const timeline = new ScrollTimeline({
    scrollSource: document.documentElement,
    timeRange: 1,
    fill: "both"
  });

  // Loop all eligible columns
  document.querySelectorAll(".column-reverse").forEach(($column) => {
    // Flip item order in reverse columns
    $column.style.flexDirection = "column-reverse";

    // Hook Animation
    $column.animate(
      {
        transform: [
          "translateY(calc(-100% + 100vh))",
          "translateY(calc(100% - 100vh))"
        ]
      },
      {
        duration: 1,
        fill: "both",
        timeline
      }
    );
  });
}
