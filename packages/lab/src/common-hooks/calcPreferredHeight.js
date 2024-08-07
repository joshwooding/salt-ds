// TODO refactor this into hook. See useListHeight hook. This code was originally used by List and Tree. List has been refactored,
// Tree hasn't yet. When Tree is finalised, probably want to share the useListHeight hook, and rename it to make it more generic.
export const calcPreferredHeight = (props = {}) => {
  const {
    borderless,
    displayedItemCount = 0,
    itemCount = 0,
    itemHeight = 0,
    getItemHeight,
    gapSize = 1,
  } = props;

  let preferredHeight = borderless ? 0 : 2;

  // if there is no item we render with the preferred count
  const preferredItemCount =
    itemCount === 0
      ? displayedItemCount
      : Math.min(displayedItemCount, itemCount);

  if (typeof getItemHeight === "function") {
    preferredHeight +=
      Array.from({ length: preferredItemCount }).reduce(
        (total, _, index) => total + Number(getItemHeight(index)) + gapSize,
        0,
      ) -
      // We don't want gap after the last item
      gapSize;
  } else {
    preferredHeight +=
      preferredItemCount * Number(itemHeight) +
      (preferredItemCount - 1) * gapSize;
  }

  // list height will be undefined if the item height can not be
  // converted to a number, for example rem or a percentage string
  return Number.isNaN(preferredHeight) ? undefined : preferredHeight;
};
