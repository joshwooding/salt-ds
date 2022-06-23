import "./skip-link.stories.css";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SkipLink } from "../src";
import { useRef } from "react";

export default {
  title: "Lab/SkipLink",
  component: SkipLink,
} as ComponentMeta<typeof SkipLink>;

export const Default: ComponentStory<typeof SkipLink> = () => {
  const articleRef = useRef<HTMLElement>(null);

  return (
    <>
      <span style={{ height: 50, lineHeight: "50px" }} tabIndex={-1}>
        Click here and press the Tab key to see the Skip Link
      </span>
      <div style={{ position: "relative", maxWidth: 500 }}>
        <SkipLink href="#main" targetRef={articleRef}>
          Skip to main content
        </SkipLink>

        <div
          style={{
            borderTop: "2px solid grey",
            fontSize: 24,
            lineHeight: 3.5,
          }}
        >
          What we do
        </div>

        <article id="main" ref={articleRef}>
          <section>
            <h1>UI Toolkit</h1>
            <p>
              UITK provides you with a suite of UI components and a flexible
              theming system. With no customisation, the default theme offers an
              attractive and modern look-and-feel, with both light and dark
              variants and support for a range of UI densities. We have included
              a theming system which allows you to easily create theme
              variations, or in fact substitute alternate themes.
            </p>
          </section>
          <section>
            <h1>Goals</h1>
            <p>The UITK has been developed with the following design goals:</p>
            <ul>
              <li>
                Providing a comprehensive set of commonly-used UI controls
              </li>
              <li>Complying with WCAG 2.1 accessibility guidelines</li>
              <li> To be lightweight and performant</li>
              <li> Offering flexible styling and theming support</li>
              <li> Minimizing dependencies on third-party libraries</li>
            </ul>
          </section>
        </article>
      </div>
    </>
  );
};
