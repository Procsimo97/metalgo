'use client';

import { addRecord, updateRecord } from "@/app/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { editIcon } from "@/image";

interface Record {
  id: number;
  title: string;
  description: string;
};


const RecordsList = () => {
  const dispatch = useDispatch();
  
  const records = useSelector((state: { records: Record[] }) => state.records)
  const [editRecordID, setEditRecordId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false); 

  const [newRecord, setNewRecord] = useState<Omit<Record, "id">>({
    title: "",
    description: "",
  });

  const addNewRecord = (e: React.FormEvent) => {
    e.preventDefault();

    //редактирование записи
    if(editMode && editRecordID !== null) {
      
      const updateEntry: Record = {
        id: editRecordID,
        title: newRecord.title,
        description: newRecord.description,
      };

      dispatch(updateRecord(updateEntry));
      setEditMode(false);
      setEditRecordId(null);
    } else {
      const newEntry: Record = {
        id: records.length + 1,
        title: newRecord.title,
        description: newRecord.description,
      };

      dispatch(addRecord(newEntry));
    }

    setNewRecord({ title: "", description: "" });
  };


  const handleEditRecord = (record: Record) => {
    setEditMode(true);
    setEditRecordId(record.id);
    setNewRecord({ title: record.title, description: record.description })
  };

  return (
  <div className="flex flex-col m-auto item-center">
    <div className="flex flex-col mx-auto mb-3">
      <h2 className="mb-2">{editMode ? 'Редактировать запись' : "Новая запись"}</h2>
      <form className="flex flex-col gap-2" onSubmit={addNewRecord}>
        <input
          className="border-yellow-300 border rounded-3xl bg-inherit px-2 py-1 m-0 p-0"
          type="text"
          placeholder="О чем?"
          value={newRecord.title}
          required
          onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value})}
        />
        <input
          className="border-yellow-300 border rounded-3xl bg-inherit px-2 py-1"
          placeholder="Описание"
          value={newRecord.description}
          required
          onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value})}
        />
        <button className="py-2 text-gray-800 bg-yellow-400 w-[300px] rounded-full hover:bg-yellow-500 transition ease-in-out delay-100" type="submit">
            {editMode ? 'Сохранить изменения' : "Добавить запись"}
        </button>
      </form>

      </div>
      
      <h2 className="text-lg text-yellow-500 mb-3">Список записей</h2>
      <ul className="w-full flex flex-col gap-2">
        
        {records.map((el) => (
          <li
            className="flex gap-2"
            key={el.id}>
            <div className="flex flex-col gap-2 px-5 py-2 border-yellow-300 border rounded-3xl">
              <h3 className="font-semibold">{el.title}</h3>
              <p className="text-sm">{el.description}</p>
            </div>
            
            <button onClick={() => handleEditRecord(el)}>
              <Image src={editIcon} alt="edit" width={30} height={30}/>
            </button>
          </li>
        ))}
      </ul>
   </div>
  )

};

export default RecordsList;
