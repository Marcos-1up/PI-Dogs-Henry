import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments } from "../../redux/actions";

function validation(input) {
  let errors = {};

  if (!input.name || input.name.length <= 1) {
    errors.name = "Name of the dog is required";
  } else if (!isNaN(input.name)) {
    errors.name = "Name of the dog must be in letters"
  }

  if (!input.weight_max) {
    errors.weight_max = "Max weight of the dog is required"
  } else if (isNaN(parseInt(input.weight_max))) {
    errors.weight_max = "Max weight of a dog must be a number"
  } else if (input.weight_max >= 100) {
    errors.weight_max = "your dog must not exceed 100 kg"
  } else if (input.weight_max <= 0) {
    errors.weight_max = "Your dog cant be less than 0 Kg"
  } else if (input.weight_max < input.weight_min) {
    errors.weight_max = "Must be greater than value min"
  }

  if (!input.weight_min) {
    errors.weight_min = "Min weight of the dog is required";
  } else if (isNaN(parseInt(input.weight_min))) {
    errors.weight_min = "Max weight of a dog must be a number"
  } else if (input.weight_min <= 0) {
    errors.weight_min = "Your dog cant be less than 0 Kg"
  } else if (input.weight_min > input.weight_max) {
    errors.weight_min = "Min weight cant be greater than Max weight"
  }

  if (!input.height_max) {
    errors.height_max = "Max height of the dog is required";
  } else if (isNaN(parseInt(input.height_max))) {
    errors.height_max = "Max height of the dog must be a number"
  } else if (input.height_max > 200) {
    errors.height_max = "Your dog cant be taller than 2 meters"
  } else if (input.height_max <= 0) {
    errors.height_max = "Your dog cant be less than 0 Cm"
  } else if (input.height_max < input.height_min) {
    errors.height_max = "Must be greater than value min"
  }

  if (!input.height_min) {
    errors.height_min = "Min height of the dog is required";
  } else if (isNaN(parseInt(input.height_min))) {
    errors.height_min = "Min height of the dog must be a number"
  } else if (input.height_min <= 0) {
    errors.height_min = "Your dog cant be less than 0 Cm"
  } else if (input.height_max < input.height_min) {
    errors.height_min = "Min height cant be greater than Max height"
  }

  if (!input.lifeSpan) {
    errors.lifeSpan = "The life expectancy of the dog is required";
  } else if (isNaN(parseInt(input.lifeSpan))) {
    errors.lifeSpan = "The life expectancy of the dog must be a number"
  } else if (input.lifeSpan <= 0) {
    errors.lifeSpan = "The life expectancy of the dog cannot be less than 0"
  }

  if (input.temperament.length < 1) {
    errors.temperament = 'Temperaments of the dog is required';
  }

  return errors;
}

export default function CreateDog() {
  const dispatch = useDispatch();
  const allTemperament = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    weight_max: "",
    weight_min: "",
    height_max: "",
    height_min: "",
    lifeSpan: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  //==============================================================================

  function handleSubmit(e) {
    e.preventDefault();
    /* if (condition) {
    } else {
    } */
  }

  function handleInputChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(validation({
      ...input,
      [e.target.name]: e.target.value,
    }))
  }

  //==============================================================================

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }
  function handleDelete(event) {
    setInput({
      ...input,
      temperament: input.temperament.filter((e) => e !== event),
    });
  }

  return (
    <div>
      <h1>Create your dog! mother fucker</h1>
      <form onSubmit={(e) => handleSubmit(e)} id="form">
        <div>
          <div>
            <label>Name: </label>
            <input type="text" value={input.name} name="name" onChange={e => handleInputChange(e)} />
            {errors.name && (
              <p /* className={style.danger} */>{errors.name}</p>
            )}
          </div>
          <div>
            <label>You can upload an image for your Dog! (URL) </label>
            <input ></input>
          </div>
          <div>
            <label>Max Weight in Kg: </label>
            <input type="number" value={input.weight_max} name="weight_max" onChange={e => handleInputChange(e)} />
            {errors.weight_max && (
              <p /* className="error" */>{errors.weight_max}</p>
            )}
          </div>
          <div>
            <label>Min Weight in Kg: </label>
            <input type="number" value={input.weight_min} name="weight_min" onChange={e => handleInputChange(e)} />
            {errors.weight_min && (
              <p /* className="error" */>{errors.weight_min}</p>
            )}
          </div>
          <div>
            <label>Max Height in Cm: </label>
            <input type="number" value={input.height_max} name="height_max" onChange={e => handleInputChange(e)} />
            {errors.height_max && (
              <p /* className="error" */>{errors.height_max}</p>
            )}
          </div>
          <div>
            <label>Min Height in Cm: </label>
            <input type="number" value={input.height_min} name="height_min" onChange={e => handleInputChange(e)} />
            {errors.height_min && (
              <p /* className="error" */>{errors.height_min}</p>
            )}
          </div>
          <div>
            <label>The life expectancy: </label>
            <input type="number" value={input.lifeSpan} name="lifeSpan" onChange={e => handleInputChange(e)} />
            {errors.lifeSpan && (
              <p /* className="error" */>{errors.lifeSpan}</p>
            )}
          </div>
          <div>
            <select
              className="createdog"
              onChange={(e) => handleSelect(e)}
              id="temp"
            >
              <option value="selected" className="createdog">
                Select temperaments
              </option>
              {allTemperament
                ?.sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((temp) => {
                  return (
                    <option className="dots" value={temp.name} key={temp.id}>
                      {temp.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            {input.temperament.map((element) => (
              <div>
                <h5>
                  {element}
                  <button
                    onClick={() => handleDelete(element)}
                    className="createdog"
                  >
                    X
                  </button>
                </h5>
              </div>
            ))}
            {errors.temperament && (
              <p /* className={style.danger} */>{errors.temperament}</p>
            )}
          </div>
        </div>
        <div>
          <Link to="/home">
            <button>Backto Home</button>
          </Link>
          <button type="submit">Create my Dog!</button>
        </div>
      </form>
    </div>
  );
}
