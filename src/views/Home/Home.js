import React, { useEffect, useState } from 'react';
import './Home.css';
import showToast from 'crunchy-toast';
import Task from '../../components/Task/Task';
import { saveListToLocalStrorage } from './../../util/LocalStotege';

const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'hi',
            discription: 'ganpati bappa morya',
            priority: 'high',
        },
    ]);

    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [priority, setPriority] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('pinklist'));
        if (list && list.length > 0) {
            setTaskList(list);
        }
    }, []);

    const clearInputFields = () => {
        setTitle('');
        setDiscription('');
        setPriority('');
    };

    const findTaskIndexById = (taskId) => {
        return taskList.findIndex((task) => task.id === taskId);
    };

    const checkRequiredFields = () =>{
        if(!title){
            showToast('Title this required !', 'alert', 3000);
            return false;
           }
           if(!discription){
               showToast('Discription this required !', 'alert', 3000);
               return false;
              }
              if(!priority){
               showToast('Priority this required !', 'alert', 3000);
               return false;
              }
              return true;

    }

    const addTaskToList = () => {
      
        if(checkRequiredFields() === false){
            return
        }
        const randomId = Math.floor(Math.random() * 1000);
        const obj = {
            id: randomId,
            title: title,
            discription: discription,
            priority: priority,
        };
        const newTaskList = [...taskList, obj];

        setTaskList(newTaskList);

        clearInputFields();

        saveListToLocalStrorage(newTaskList);
        
        showToast('Added new task', 'success', 3000);
    };

    const removeTaskFromList = (taskId) => {
        const index = findTaskIndexById(taskId);

        if (index !== -1) {
            const tempArray = [...taskList];
            tempArray.splice(index, 1);

            setTaskList(tempArray);

            saveListToLocalStrorage(tempArray);
            showToast('Task deleted successfully!', 'alert', 3000);
        }
    };

    const setTaskEditable = (taskId) => {
        setIsEdit(true);
        setId(taskId);

        const index = findTaskIndexById(taskId);

        if (index !== -1) {
            const currentEditTask = taskList[index];

            setTitle(currentEditTask.title);
            setDiscription(currentEditTask.discription);
            setPriority(currentEditTask.priority);
        }
    };

    const updateTask = () => {
        const indexToUpdate = findTaskIndexById(id);
        if(checkRequiredFields() === false){
            return
        }

        if (indexToUpdate !== -1) {
            const tempArray = [...taskList];
            tempArray[indexToUpdate] = {
                id: id,
                title: title,
                discription: discription,
                priority: priority,
            };

            setTaskList(tempArray);

            saveListToLocalStrorage(tempArray);
            setId(0);

            clearInputFields();
            setIsEdit(false);
            showToast('Task updated successfully!', 'info', 3000);
        }
    };

    return (
        <>
            <div className='contener'>
                <h1 className='text-center-title'>Daily Duty App 📑</h1>

                <div className='todo-flex-contener'>
                    <div>
                        <h2 className='text-center'>Show List</h2>
                        <div className='task-contener1'>
                            {taskList.map((taskItem, index) => {
                                const { id, title, discription, priority } = taskItem;
                                return (
                                    <Task
                                        id={id}
                                        title={title}
                                        discription={discription}
                                        priority={priority}
                                        key={index}
                                        removeTaskFromList={removeTaskFromList}
                                        setTaskEditable={setTaskEditable}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h2 className='text-center'>
                            {isEdit ? `Update List ${id}` : 'Add List'}
                        </h2>
                        <div className='form-contener'>
                            <form>
                                <input
                                    type='text'
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                    placeholder='Enter Title'
                                    className='task-input'
                                />
                                <input
                                    type='text'
                                    value={discription}
                                    onChange={(e) => {
                                        setDiscription(e.target.value);
                                    }}
                                    placeholder='Enter Description'
                                    className='task-input'
                                />
                                <input
                                    type='text'
                                    value={priority}
                                    onChange={(e) => {
                                        setPriority(e.target.value);
                                    }}
                                    placeholder='Enter Priority'
                                    className='task-input'
                                />

                                <div className='button-contener'>
                                    <button
                                        className='btn'
                                        onClick={() => {
                                            isEdit ? updateTask() : addTaskToList();
                                        }}
                                        type='button'
                                    >
                                        {isEdit ? 'Update' : 'Add'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;
