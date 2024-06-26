import { Link } from "react-router-dom";
import { BlockPanelHeaderParams } from "../utils/constants/BlockParams";
import { abbreviateString } from "../utils/abbreviateString";
import { timestampConverter } from "../utils/timestampConverter";

const BlockBoard = ({ blocks }) => {
  return (
    <div className="flex flex-col p-0 bg-white border-[1px] dark:bg-darkPrimary border-colorSeparator dark:border-darkColorSeparator rounded-lg max-w-full w-[49%] sm:w-full md:w-full">
      <div className="p-4 h-[62px] border-b-[1px] border-colorSeparator dark:border-darkColorSeparator flex flex-row justify-between items-center">
        <span className="text-[18px] leading-[24px] font-bold text-fontSecondary dark:text-darkFontPrimary">
          Latest Blocks
        </span>
        <div className=""></div>
      </div>
      <div className="flex flex-col p-6 max-w-full min-w-0 min-h-0 h-[690px] justify-between">
        <div
          className="overflow-x-auto overflow-y-hidden flex flex-col max-w-full"
          id="Scrollbar"
        >
          <table className="w-full relative border-spacing-0 border-separate h-auto">
            <thead>
              <th className="p-0 m-0 text-start min-w-[50px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  Shard
                </span>
              </th>
              <th className="p-0 m-0 text-center min-w-[60px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  Hash
                </span>
              </th>
              <th className="p-0 m-0 text-center min-w-[110px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  Height
                </span>
              </th>
              <th className="p-0 m-0 text-center min-w-[100px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  Transactions
                </span>
              </th>
              <th className="p-0 m-0 text-right min-w-[150px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  Timestamp
                </span>
              </th>
            </thead>
            <tbody>
              {blocks &&
                blocks.length > 0 &&
                blocks.map((item, index) => {
                  return (
                    <tr
                      className="[&>*:last-child]:text-right text-[14px]"
                      key={index}
                    >
                      <td className="text-start py-4 pl-3 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <div className="max-w-[125px] text-primary dark:text-darkIconColor">
                          {item?.zone}
                        </div>
                      </td>
                      <td className="text-center py-4 pl-5 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <Link to={`/block/${item?.hash}`}>
                          <div className=" text-primary dark:text-darkIconColor">
                            {abbreviateString(item?.hash || "")}
                          </div>
                        </Link>
                      </td>
                      <td className="text-center py-4 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <Link to={`/block/${item?.hash}`}>
                          <div className=" text-primary dark:text-darkIconColor">
                            {abbreviateString(String(item?.height || ""))}
                          </div>
                        </Link>
                      </td>
                      <td className="text-center py-4 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <div className=" text-primary dark:text-darkIconColor">
                          {abbreviateString(String(item?.transactions || ""))}
                        </div>
                      </td>
                      <td className="text-right py-4 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <span className=" text-fontPrimary">
                          {timestampConverter(item?.timestamp || "")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Link
          to="/blocks/"
          className="mt-6 w-full border-[1px] border-colorSeparator dark:border-darkColorSeparator text-primary dark:text-darkIconColor text-[12px] font-bold rounded-[4px] py-2 px-[5px] bg-transparent transition-all duration-300 delay-0 hover:tracking-[0.3px]"
        >
          VIEW ALL BLOCKS
        </Link>
      </div>
    </div>
  );
};

export default BlockBoard;
