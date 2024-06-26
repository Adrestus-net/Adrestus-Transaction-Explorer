import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { findAllBlocksBetweenRange } from "../../actions/blockAction";
import { TimeStamp } from "../../utils/TimeSort";
import BlockHeader from "./BlockHeader";
import BlockBodyContent from "./BlockBodyContent";
import PaginationTemp from "../../components/PaginationTemp";
import CSVExport from "../../components/ExplorerView/AddressView/CSVExport";

const BlocksExplorer = () => {
  const id = useParams();

  const [blocks, setBlocks] = useState(null);
  const [blockPerPage, setBlockPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateASC, setDateASC] = useState(true);

  const DateOrderhandler = (e) => {
    e.preventDefault();
    setDateASC(!dateASC);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, blockPerPage, dateASC]);

  const handleSelectChange = (event) => {
    setBlockPerPage(event.target.value);
  };

  async function fetchData() {
    setLoading(true); // Begin loading
    try {
      const fetchedBlocks = await findAllBlocksBetweenRange(
        currentPage,
        blockPerPage
      );
      setTotalPage(fetchedBlocks.length / blockPerPage);
      setBlocks(fetchedBlocks);
    } catch (error) {
      console.error("Error fetching transaction: ", error);
      setError(error); // Set the error state
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="w-full justify-start max-w-[1408px] min-w-[343px] flex flex-col items-start px-5 mx-auto pb-10">
      <h2 className="dark:text-white text-black text-[34px] leading-[1.2em] font-semibold text-left">
        Blocks
      </h2>
      <div className="pt-4 w-full">
        <div className="rounded-lg overflow-x-auto flex flex-col bg-white dark:bg-darkPrimary p-6 border-[1px] dark:border-darkColorSeparator border-colorSeparator">
          <div className="flex flex-col">
            {/* Tab Index */}
            <div className=""></div>
            {/* MainBoard */}
            <div className="p-[10px] flex flex-col gap-3">
              <div className="flex flex-row justify-between w-full">
                <span className="text-[18px] leading-[1.5em] text-[rgb(85,98,109)] dark:text-white">
                  {blockPerPage}&nbsp;blocks shown
                </span>
                <PaginationTemp
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPage={totalPage}
                />
              </div>
              <div
                className="overflow-auto transition-all duration-100 min-h-[600px] flex flex-col"
                id="Scrollbar"
              >
                <table className="w-full min-w-[1266px] table-auto relative border-spacing-0 border-separate h-full max-h-[1266px] overflow-y-hidden">
                  <BlockHeader
                    dateASC={dateASC}
                    DateOrderhandler={DateOrderhandler}
                  />
                  <tbody className="max-h-[1266px] overflow-y-hidden">
                    {blocks &&
                      TimeStamp(blocks, dateASC).map((item, index) => (
                        <BlockBodyContent key={index} item={item} />
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-6 flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4 items-center">
                  <div className="flex items-center justify-between flex-row border">
                    <select
                      value={blockPerPage}
                      onChange={handleSelectChange}
                      className="block appearance-none w-full bg-transparent border border-gray-400 hover:border-gray-500 hover:cursor-pointer px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:text-white"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <span className="dark:text-white text-[14px] leading-[1.5em] text-[#55626D]">
                    records per page
                  </span>
                </div>
                <PaginationTemp
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPage={totalPage}
                />
              </div>
              <CSVExport id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocksExplorer;
