import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
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
          <AccordionTrigger className="text-inherit text-lg no-underline">
            Hvornår åbner festivalen?
          </AccordionTrigger>
          <AccordionContent className="text-white font-semibold ">
            Festivalen åbner fredag kl. 12:00 og slutter søndag kl. 23:59.
            Campingområdet åbner torsdag kl. 16:00.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-inherit text-lg no-underline">
            Hvordan kommer jeg til festivalen?
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit font-medium">
            Du kan tage toget til byens station, hvor der kører shuttlebusser
            direkte til festivalområdet. Der er også parkeringspladser for dem,
            der ankommer i bil.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-inherit text-lg no-underline">
            Er der mad og drikke tilgængeligt på festivalen?
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit font-medium">
            Ja, vi har et bredt udvalg af madboder, der tilbyder alt fra
            vegetarretter til street food. Der er også flere barer, hvor du kan
            købe øl, drinks og sodavand.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-inherit text-lg no-underline">
            Kan jeg betale med kontanter på festivalen?
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit font-medium">
            Festivalen er kontantfri. Du kan betale med kreditkort eller
            MobilePay i alle boder og barer.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-inherit text-lg no-underline">
            Er der campingmuligheder på festivalen?
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit font-medium">
            Ja, vi har et dedikeret campingområde med forskellige muligheder,
            herunder standardcamping, glamping-telte og pladser til
            campingvogne. Husk at booke plads på forhånd!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default AccordionComponent;
