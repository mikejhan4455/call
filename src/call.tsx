import { LaunchProps, getSelectedText, open, showHUD } from "@raycast/api";

interface Arguments {
  number: string;
}

// Modified code based on pernielsentikaer 's suggestion
// Thanks to @pernielsentikaer for the improvement
export default async function Command(
  props: LaunchProps<{
    arguments: Arguments;
  }>
) {
  const { fallbackText } = props;
  const { number } = props.arguments;

  let dialNumber = fallbackText || number;
  if (dialNumber === "") {
    try {
      const selectedText = await getSelectedText();
      if (selectedText !== "") {
        dialNumber = selectedText;
      }
    } catch (error) {
      console.error(error);
    }
  }

  dialNumber = dialNumber.replace(/\s/g, "");

  try {
    await open(`tel://${dialNumber.trim()}`);
    await showHUD(`Opening facetime calling ${dialNumber}...`);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      await showHUD(error.message);
    }
  }
}
