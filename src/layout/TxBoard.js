import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import { TxPanelHeaderParams } from "../utils/constants/TxParams";
import { abbreviateString } from "../utils/abbreviateString.js";
import { timestampConverter } from "../utils/timestampConverter";

const TxBoard = ({ transactions }) => {
  return (
    <div className="flex flex-col p-0 bg-white dark:bg-darkPrimary border-[1px] border-colorSeparator dark:border-darkColorSeparator rounded-lg max-w-full w-[49%] sm:w-full md:w-full">
      <div className="p-4 h-[62px] border-b-[1px] border-colorSeparator dark:border-darkColorSeparator flex flex-row justify-between items-center">
        <span className="text-[18px] leading-[24px] font-bold text-fontSecondary dark:text-darkFontPrimary">
          Latest Transactions
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
              <th className="p-0 m-0 text-center w-full min-w-[90px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  Hash
                </span>
              </th>
              <th className="p-0 m-0 text-center w-full min-w-[80px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  Height
                </span>
              </th>
              <th className="p-0 m-0 text-center w-full min-w-[110px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  From
                </span>
              </th>
              <th className="p-0 m-0 text-center w-full min-w-[110px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  To
                </span>
              </th>
              <th className="p-0 m-0 text-right w-full min-w-[150px]">
                <span className="text-[14px] text-fontPrimary dark:text-darkHeaderColor font-light leading-[20px]">
                  Timestamp
                </span>
              </th>
            </thead>
            <tbody>
              {transactions.length > 0 &&
                transactions.map((item, index) => {
                  return (
                    <tr
                      className="[&>*:last-child]:text-right text-[14px]"
                      key={index}
                    >
                      <td className="text-start py-4 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <div className="max-w-[125px] text-fontPrimary flex flex-row gap-[2px] items-center">
                          {item?.zoneFrom}
                          <span>
                            <Icon
                              icon="tdesign:arrow-right"
                              className="text-[#69FABD]"
                            />
                          </span>
                          {item?.zoneTo}
                        </div>
                      </td>
                      <td className="text-center ml-5 py-4 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <Link to={`/tx/${item?.transaction_hash}`}>
                          <div className="text-primary dark:text-darkIconColor">
                            {abbreviateString(item?.transaction_hash)}
                          </div>
                        </Link>
                      </td>
                      <td className="text-center py-4 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <Link to={`/tx/${item?.transaction_hash}`}>
                          <div className="max-w-[125px]  text-primary dark:text-darkIconColor">
                            {item?.blockHeight}
                          </div>
                        </Link>
                      </td>
                      <td className="text-center py-4 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <Link to={`/address/${item?.fromAddress}`}>
                          <div className="max-w-[125px] text-primary dark:text-darkIconColor">
                            {abbreviateString(item?.fromAddress)}
                          </div>
                        </Link>
                      </td>
                      <td className="text-center py-4 border-b-[1px] border-colorSeparator dark:border-darkColorSeparator">
                        <Link
                          to={`/address/${item?.toAddress}`}
                          className="text-primary dark:text-darkIconColor max-w-[125px]"
                        >
                          {abbreviateString(item?.toAddress)}
                        </Link>
                      </td>
                      <td className="max-w-[150px] text-left py-4 border-b-[1px] text-fontPrimary border-colorSeparator dark:border-darkColorSeparator">
                        {timestampConverter(item?.creationDate)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Link
          to="/transactions/"
          className="w-full mt-6 border-[1px] border-colorSeparator dark:border-darkColorSeparator text-primary dark:text-darkIconColor text-[12px] font-bold rounded-[4px] py-2 px-[5px] bg-transparent transition-all duration-300 delay-0 hover:tracking-[0.3px]"
        >
          VIEW ALL TRANSACTIONS
        </Link>
      </div>
    </div>
  );
};

export default TxBoard;
