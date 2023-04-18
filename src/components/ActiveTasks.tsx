import React, { useContext } from 'react';
import 'tachyons';
import { Checkbox, FontIcon, mergeStyleSets, mergeStyles } from '@fluentui/react';
import { IEachTaskDT, TodoContext } from './Provider';
import DescriptionToActiveTasks from './DescriptionToActiveTasks';

export const iconStyles= mergeStyleSets({  // this function is used to write css as javascript
    style1: {
        fontSize: 20,
        margin: '0 5px',
        cursor: "pointer"
    },
    disabled: {
        color: "gray",
        cursor: "default"
    }
})

type Props= {
    onClickEdit: (taskidtoupdate: string) => void  // this means that onClickEdit is a function that takes one argument 'taskidtoupdate' which is a string and returns nothing
}

const ActiveTasks = ({ onClickEdit }: Props) => {
  const { sendactiveTaskInfo, dispatch } = useContext(TodoContext);

  const completedTasks = sendactiveTaskInfo.filter((task) => task.isChecked);
  const activeTasks = sendactiveTaskInfo.filter((task) => !task.isChecked);

  const onRenderTask = (obj: IEachTaskDT) => {
    const titleStyle = obj.isChecked ? { textDecoration: "line-through" } : {};
    return (
      <div
        key={obj.id}
        className="ma3 ph3 flex items-center justify-between h3 b near-black bg-light-gray shadow-5"
      >
        <div className="flex">
          <Checkbox
            checked={obj.isChecked}
            onChange={() => onChangeCheckbox(obj)}
          />
          <span style={titleStyle}>{obj.title}</span>
        </div>
        <div className="flex">
          <DescriptionToActiveTasks sendobj={obj} />
          <FontIcon
            iconName="EditNote"
            className={
              obj.isChecked
                ? mergeStyles(iconStyles.style1, iconStyles.disabled)
                : iconStyles.style1
            }
            onClick={obj.isChecked ? () => {} : () => onClickEdit(obj.id)}
          />
          <FontIcon
            iconName="Delete"
            className={iconStyles.style1}
            onClick={() => onClickDelete(obj.id)}
          />
        </div>
      </div>
    );
  };

  const onChangeCheckbox = (obj: IEachTaskDT) => {
    obj.isChecked = !obj.isChecked;
    dispatch({ type: "update", data: obj });
  };

  const onClickDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete"))
      dispatch({ type: "delete", data: { id } });
  };

  return (
    <div className="tl">
      {activeTasks.map(onRenderTask)}
      {completedTasks.length > 0 && <h2>Completed tasks</h2>}
      {completedTasks.map(onRenderTask)}
    </div>
  );
};


export default ActiveTasks;

