import { Container } from "../container/Container";
import close from "../../assets/close.png";
import click from "../../assets/click.png";
import shift from "../../assets/shift.png";
import usage from "../../assets/usage.webp";
export const Help = ({ onClose }) => (
  <div>
    <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-55"></div>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative">
        <img
          src={close}
          alt="Close"
          className="crisp absolute -left-9 top-0 cursor-pointer"
          width="32px"
          height="32px"
          title="Close"
          onClick={onClose}
        />
        <Container title="help" alt>
          <Container.Primary>
            <img
              src={usage}
              alt="Usage gif"
              className="float-right ml-4 w-32"
            />
            <p className="prose  mb-5 text-justify text-white">
              This editor allows you to modify the traits and behaviour of bees.
              To get started, put some bees in your in-game inventory and load
              the save file.
            </p>
            <p className="prose  text-justify text-white prose-img:my-0">
              First, select a bee to view its traits, then use{" "}
              <img
                src={click}
                alt="left click"
                className="crisp inline"
                width="16px"
              />
              on the traits to modify the direct trait, holding{" "}
              <img
                src={shift}
                alt="shift"
                className="crisp inline"
                width="40px"
              />{" "}
              while clicking will modify the recessive trait.
            </p>
            <p className="prose  text-justify text-white">
              Clicking on the <span className="font-apico">B</span> or{" "}
              <span className="font-apico">C</span> will apply the special
              traits &quot;Cathermal&quot; or &quot;Flexible&quot; to the bee.
            </p>
            <p className="prose  mb-5  text-justify text-white">
              To se the &quot;Rain-loving&quot; or &quot;Snow-loving&quot; trait
              cicle through the water droplet.
            </p>
            <p className="prose prose-invert text-white">
              Checkout the{" "}
              <a href="https://github.com/mrmarble/apico-editor">
                Github repository
              </a>{" "}
              for more information.
            </p>
          </Container.Primary>
        </Container>
      </div>
    </div>
  </div>
);
