import DagreGraph from "dagre-d3-react";
import {useSelector} from "react-redux"

function OrganizationTree() {
    const allNodes = useSelector(state => state.taskReducer.allNodes);
    const allLinks = useSelector(state => state.taskReducer.allLinks);
  return (
    <div className="Tree">
      <DagreGraph
        nodes={allNodes}
        links={allLinks}
        config={{
          rankdir: "TB",
          ranker: "tight-tree",
        }}
        width="65vw"
        height="98vh"
        animate={1000}
        fitBoundaries
      />
    </div>
  );
}

export default OrganizationTree;
