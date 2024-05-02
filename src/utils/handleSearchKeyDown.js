import { searchAction } from "../actions/searchAction";

export async function HandleSearchKeyDown(value) {
  if (value.startsWith("ADR-")) {
    window.location.href = `/address/${value}`;
  } else if (value.length === 64) {
    const result = await searchAction(value);
    switch (result) {
      case "block":
        window.location.href = `/block/${value}`;
        break;
      case "txBlock":
        window.location.href = `/tx/${value}`;
        break;
      case "txHash":
        window.location.href = `/tx/${value}`;
        break;
      default:
        alert("Invalid value");
        break;
    }
  } else {
    alert("Invalid value");
  }
}
