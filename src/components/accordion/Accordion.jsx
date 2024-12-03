import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionComponent = () => {
  return (
    <section className="flex flex-col items-center justify-center p-4">
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-lg text-inherit font-inherit"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-inherit font-inherit">
            question 1
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit">
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-inherit font-inherit">
            question 2
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit">
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-inherit font-inherit">
            question 3
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit">
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-inherit font-inherit">
            question 4
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit">
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-inherit font-inherit">
            question 5
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit">
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default AccordionComponent;
