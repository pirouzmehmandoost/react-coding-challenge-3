import logo from './logo.svg';
import './App.css';
import { useCallback, useState } from "react";
import styled from "styled-components";

const baseUrl = 'https://www.boredapi.com/api/activity';

function App() {
  return (
    <>
      <GenerateList/>
    </>
  );
}

const GenerateList = () => {
  const [activitiesArr, setActivitiesArr] = useState([]);

  const fetchData = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    console.log('fetchData()', data);
    addActivity(data);
    return data;
  };
  
  const addActivity = (data) => {
    const items = [...activitiesArr]
    items.push(data)
    console.log('addActivity: ', items)

    setActivitiesArr(items)
  }

  const handleButtonClick = useCallback(() => {
    const data = fetchData();

    return <ExpandableListItem item={data} />;
  }, [activitiesArr]);

  return (
    <>
      <ItemButton onClick = {handleButtonClick} >
        Add item to list
      </ItemButton>

      {
        activitiesArr.map( activity => {
          return <ExpandableListItem item = { activity} />
        })
      }
    </>
  );
};

const ExpandableListItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExpandListItem = useCallback(() => {
    console.log('handleExpandListItem', item);
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <ul>
      <li>
        { 
          Object.entries(item).map( ([key, value]) => { 
            return ( 
              <>
                { key === "activity" && (
                  <RowHeader>
                    {value}
                    <ItemButton onClick = {handleExpandListItem} >
                      { isOpen ? "Collapse" : "Expand" }
                    </ItemButton>
                  </RowHeader>          
                )}
                
                { isOpen && key !== "activity" && (
                  <ul>
                     <li>
                      {key}: {value}
                     </li>
                  </ul>
                )}
              </>
            )
          })
        }
      </li>
    </ul>
  );
};

export default App;

const RowHeader = styled.div ` 
  display: flex;
  justify-content: left;
  font-weight: bold;
  flex-direction: row;
`;

const ItemButton = styled.button ` 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  `;