import React from "react";

export default function Services({ selected, onChange }) {
  function handleClick(event) {
    const { checked, name } = event.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName != name)]);
    }
  }
  return (
    <>
      <div className=" gap-1 flex flex-col">
        <h3 className="mt-3 mb-2 text-sky-500"> General dental services</h3>
        <div className="mb-3 text-sm">
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("teeth cleaning")}
              name="teeth cleaning"
              onChange={handleClick}
            />
            <span>Teeth cleaning</span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("tooth extractions")}
              name="tooth extractions"
              onChange={handleClick}
            />
            <span>Tooth extractions</span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("wisdom tooth removal")}
              name="wisdom tooth removal"
              onChange={handleClick}
            />
            <span>Wisdom tooth removal</span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("children’s dentistry")}
              name="children’s dentistry"
              onChange={handleClick}
            />
            <span>Children’s dentistry</span>
          </label>
        </div>
      </div>
      <div className="gap-1 flex flex-col">
        <h3 className="my-2 text-sky-500"> Orthodontics</h3>
        <div className="mb-3 text-sm">
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("braces procedures")}
              name="braces procedures"
              onChange={handleClick}
            />
            <span>Braces Procedures</span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("invisalign")}
              name="invisalign"
              onChange={handleClick}
            />
            <span>Invisalign</span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("sealants")}
              name="sealants"
              onChange={handleClick}
            />
            <span>Sealants</span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("tooth injury")}
              name="tooth injury"
              onChange={handleClick}
            />
            <span>Tooth Injury </span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("tooth decay")}
              name="tooth decay"
              onChange={handleClick}
            />
            <span>Tooth Decay</span>
          </label>
        </div>
      </div>
      <div className="gap-1 flex flex-col mb-10">
        <h3 className="my-2 text-sky-500"> Restorative Dental</h3>
        <div className="mb-3 text-sm">
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("dental crowns and bridges")}
              name="dental crowns and bridges"
              onChange={handleClick}
            />
            <span>Dental Crowns and Bridges</span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("root canal")}
              name="root canal"
              onChange={handleClick}
            />
            <span>Root Canal</span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("dental fillings")}
              name="dental fillings"
              onChange={handleClick}
            />
            <span>Dental Fillings</span>
          </label>
          <label className="border mr-1 p-2 rounded-xl gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes("inlays, on-lays & veneers")}
              name="inlays, on-lays & veneers"
              onChange={handleClick}
            />
            <span>Inlays, On-lays & Veneers</span>
          </label>
        </div>
      </div>
    </>
  );
}
