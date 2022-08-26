import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup';
import useSound from 'use-sound';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

import categories from '../data/categories';
import schema from '../validation/formSchema';
import { setData, setCategory, setMode, setName } from '../state/actions/quizActions';
import { fetchData } from '../state/actions/stateActions';
import popSfx from '../assets/audio/pop.mp3';
import PopupModule from '../components/common/PopupModule';
import Screen from '../components/common/Screen';

const sharedValues = {
  mode: '',
  category: '',
  difficulty: '',
};

const initialFormValues = {
  ...sharedValues,
};

const initialFormErrors = {
  ...sharedValues,
};

const initialDisabled = true;

const Settings = ({ setData, setCategory, setMode, setName, fetchData, isFetching }) => {
  const [wizard, setWizard] = useState('');
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [pop] = useSound(popSfx, { volume: 0.01 });
  const navigate = useNavigate();

  const shortName = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    length: 2,
  });

  const fillWizard = () => {
    if (localStorage.getItem('moniker') == null) {
      setWizard(shortName);
    } else {
      setWizard(localStorage.getItem('moniker'));
    }
  };

  const handleWizard = (e) => {
    setWizard(e.target.value);
  };

  const handleGamble = () => {
    setWizard(shortName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    axios
      .get(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_KEY}`, {
        params: {
          limit: `${formValues.mode}`,
          category: `${formValues.category}` === 'Any' ? '' : `${formValues.category}`,
          difficulty: `${formValues.difficulty}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setCategory(`${formValues.category}` === 'Any' ? 'Any' : `${formValues.category}`);
        setMode(`${formValues.mode}` === '20' ? 'Sudden Death' : `${formValues.mode}`);
        setName(wizard);
        localStorage.setItem('moniker', wizard);
        navigate('/quiz');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  useEffect(() => {
    fillWizard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      {isFetching && <PopupModule headerText={'a worthy quiz is being created...'} />}
      <SettingsContainer>
        <Title>SETTINGS</Title>

        <Form onSubmit={handleSubmit}>
          <SettingsSection>
            <SettingTitle>Name</SettingTitle>
            <BoxContainers>
              <Dice onPointerDown={handleGamble}>🎲</Dice>
              <label>
                <input
                  className="box"
                  type="text"
                  placeholder="Smarterdore"
                  onChange={handleWizard}
                  value={wizard}
                  onMouseOver={pop}
                />
              </label>
            </BoxContainers>
          </SettingsSection>
          <SettingsSection>
            <SettingTitle>Mode</SettingTitle>
            <InputContainer>
              <label className="modeSelect">
                <input
                  className="mode"
                  type="radio"
                  name="mode"
                  id="5"
                  value="5"
                  checked={formValues.mode === '5'}
                  onChange={handleChange}
                  onMouseOver={pop}
                />
                <svg
                  width="65"
                  height="25"
                  viewBox="0 0 65 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="64" height="24" fill="" stroke="black" />
                  <path
                    d="M11.5554 18V7.09091H18.0966V8.26278H12.8764V11.9489H17.6065V13.1207H12.8764V18H11.5554ZM25.8989 7.09091V18H24.5779V7.09091H25.8989ZM33.2138 7.09091L36.4524 16.2741H36.5803L39.8189 7.09091H41.2038L37.1982 18H35.8345L31.8288 7.09091H33.2138ZM47.1218 18V7.09091H53.7056V8.26278H48.4428V11.9489H53.3647V13.1207H48.4428V16.8281H53.7908V18H47.1218Z"
                    fill="grey"
                  />
                </svg>
              </label>
              <label className="modeSelect">
                <input
                  className="mode"
                  type="radio"
                  name="mode"
                  value="10"
                  checked={formValues.mode === '10'}
                  onChange={handleChange}
                  onMouseOver={pop}
                />
                <svg
                  width="65"
                  height="25"
                  viewBox="0 0 65 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="64" height="24" fill="none" stroke="black" />
                  <path
                    d="M14.0643 8.26278V7.09091H22.2461V8.26278H18.8157V18H17.4947V8.26278H14.0643ZM28.5036 18V7.09091H35.0874V8.26278H29.8247V11.9489H34.7465V13.1207H29.8247V16.8281H35.1727V18H28.5036ZM50.3378 7.09091V18H49.0594L43.1148 9.43466H43.0083V18H41.6872V7.09091H42.9656L48.9316 15.6776H49.0381V7.09091H50.3378Z"
                    fill="grey"
                  />
                </svg>
              </label>
              <label className="modeSelect">
                <input
                  className="mode"
                  type="radio"
                  name="mode"
                  value="20"
                  checked={formValues.mode === '20'}
                  onChange={handleChange}
                  onMouseOver={pop}
                />
                <svg
                  width="65"
                  height="25"
                  viewBox="0 0 65 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="64" height="24" fill="" stroke="black" />
                  <path
                    d="M9.75586 21H7.06268V12.2727H9.87518C10.7218 12.2727 11.4462 12.4474 12.0485 12.7969C12.6507 13.1435 13.1124 13.642 13.4334 14.2926C13.7544 14.9403 13.915 15.7159 13.915 16.6193C13.915 17.5284 13.753 18.3111 13.4292 18.9673C13.1053 19.6207 12.6337 20.1236 12.0144 20.4759C11.3951 20.8253 10.6422 21 9.75586 21ZM8.1195 20.0625H9.68768C10.4093 20.0625 11.0073 19.9233 11.4817 19.6449C11.9561 19.3665 12.3098 18.9702 12.5428 18.456C12.7757 17.9418 12.8922 17.3295 12.8922 16.6193C12.8922 15.9148 12.7772 15.3082 12.5471 14.7997C12.3169 14.2884 11.9732 13.8963 11.5158 13.6236C11.0584 13.348 10.4888 13.2102 9.807 13.2102H8.1195V20.0625ZM19.0627 21V12.2727H24.3297V13.2102H20.1195V16.1591H24.057V17.0966H20.1195V20.0625H24.3979V21H19.0627ZM29.9675 21H28.8596L32.0641 12.2727H33.155L36.3596 21H35.2516L32.6436 13.6534H32.5755L29.9675 21ZM30.3766 17.5909H34.8425V18.5284H30.3766V17.5909ZM40.6167 13.2102V12.2727H47.1621V13.2102H44.4178V21H43.361V13.2102H40.6167ZM52.1681 21V12.2727H53.225V16.1591H57.8784V12.2727H58.9352V21H57.8784V17.0966H53.225V21H52.1681Z"
                    fill="red"
                  />
                  <path
                    d="M14.5934 4.63636C14.5593 4.34848 14.421 4.125 14.1786 3.96591C13.9362 3.80682 13.6388 3.72727 13.2866 3.72727C13.029 3.72727 12.8036 3.76894 12.6104 3.85227C12.4192 3.93561 12.2695 4.05019 12.1616 4.19602C12.0555 4.34186 12.0025 4.50758 12.0025 4.69318C12.0025 4.84848 12.0394 4.98201 12.1133 5.09375C12.189 5.2036 12.2856 5.29545 12.4031 5.36932C12.5205 5.44129 12.6436 5.50095 12.7724 5.5483C12.9012 5.59375 13.0195 5.63068 13.1275 5.65909L13.7184 5.81818C13.8699 5.85795 14.0385 5.91288 14.2241 5.98295C14.4116 6.05303 14.5906 6.14867 14.761 6.26989C14.9334 6.3892 15.0754 6.54261 15.1871 6.73011C15.2989 6.91761 15.3548 7.14773 15.3548 7.42045C15.3548 7.73485 15.2724 8.01894 15.1076 8.27273C14.9447 8.52652 14.7061 8.72822 14.3917 8.87784C14.0792 9.02746 13.6995 9.10227 13.2525 9.10227C12.8358 9.10227 12.475 9.03504 12.1701 8.90057C11.8671 8.7661 11.6284 8.5786 11.4542 8.33807C11.2818 8.09754 11.1843 7.81818 11.1616 7.5H11.8888C11.9078 7.7197 11.9817 7.90152 12.1104 8.04545C12.2411 8.1875 12.4059 8.29356 12.6048 8.36364C12.8055 8.43182 13.0214 8.46591 13.2525 8.46591C13.5214 8.46591 13.7629 8.42235 13.9769 8.33523C14.1909 8.24621 14.3604 8.12311 14.4854 7.96591C14.6104 7.80682 14.6729 7.62121 14.6729 7.40909C14.6729 7.21591 14.619 7.05871 14.511 6.9375C14.4031 6.81629 14.261 6.7178 14.0849 6.64205C13.9087 6.56629 13.7184 6.5 13.5138 6.44318L12.7979 6.23864C12.3434 6.10795 11.9835 5.9214 11.7184 5.67898C11.4532 5.43655 11.3207 5.11932 11.3207 4.72727C11.3207 4.40151 11.4087 4.11742 11.5849 3.875C11.7629 3.63068 12.0015 3.44129 12.3008 3.30682C12.6019 3.17045 12.9381 3.10227 13.3093 3.10227C13.6843 3.10227 14.0176 3.16951 14.3093 3.30398C14.601 3.43655 14.832 3.61837 15.0025 3.84943C15.1748 4.08049 15.2657 4.3428 15.2752 4.63636H14.5934ZM22.5813 3.18182H23.2859V7.03409C23.2859 7.43182 23.1921 7.78693 23.0046 8.09943C22.819 8.41004 22.5567 8.6553 22.2177 8.83523C21.8787 9.01326 21.4809 9.10227 21.0245 9.10227C20.5681 9.10227 20.1703 9.01326 19.8313 8.83523C19.4923 8.6553 19.229 8.41004 19.0415 8.09943C18.8559 7.78693 18.7631 7.43182 18.7631 7.03409V3.18182H19.4677V6.97727C19.4677 7.26136 19.5302 7.5142 19.6552 7.7358C19.7802 7.95549 19.9582 8.12879 20.1893 8.25568C20.4222 8.38068 20.7006 8.44318 21.0245 8.44318C21.3484 8.44318 21.6268 8.38068 21.8597 8.25568C22.0927 8.12879 22.2707 7.95549 22.3938 7.7358C22.5188 7.5142 22.5813 7.26136 22.5813 6.97727V3.18182ZM28.7383 9H26.9428V3.18182H28.8178C29.3822 3.18182 29.8652 3.2983 30.2667 3.53125C30.6682 3.76231 30.976 4.0947 31.19 4.52841C31.404 4.96023 31.511 5.47727 31.511 6.07955C31.511 6.68561 31.4031 7.20739 31.1871 7.64489C30.9712 8.08049 30.6568 8.41572 30.244 8.65057C29.8311 8.88352 29.3292 9 28.7383 9ZM27.6474 8.375H28.6928C29.1739 8.375 29.5726 8.2822 29.8888 8.09659C30.2051 7.91098 30.4409 7.64678 30.5962 7.30398C30.7515 6.96117 30.8292 6.55303 30.8292 6.07955C30.8292 5.60985 30.7525 5.20549 30.5991 4.86648C30.4457 4.52557 30.2165 4.2642 29.9116 4.08239C29.6067 3.89867 29.2269 3.80682 28.7724 3.80682H27.6474V8.375ZM36.7383 9H34.9428V3.18182H36.8178C37.3822 3.18182 37.8652 3.2983 38.2667 3.53125C38.6682 3.76231 38.976 4.0947 39.19 4.52841C39.404 4.96023 39.511 5.47727 39.511 6.07955C39.511 6.68561 39.4031 7.20739 39.1871 7.64489C38.9712 8.08049 38.6568 8.41572 38.244 8.65057C37.8311 8.88352 37.3292 9 36.7383 9ZM35.6474 8.375H36.6928C37.1739 8.375 37.5726 8.2822 37.8888 8.09659C38.2051 7.91098 38.4409 7.64678 38.5962 7.30398C38.7515 6.96117 38.8292 6.55303 38.8292 6.07955C38.8292 5.60985 38.7525 5.20549 38.5991 4.86648C38.4457 4.52557 38.2165 4.2642 37.9116 4.08239C37.6067 3.89867 37.2269 3.80682 36.7724 3.80682H35.6474V8.375ZM42.9428 9V3.18182H46.4542V3.80682H43.6474V5.77273H46.2724V6.39773H43.6474V8.375H46.4996V9H42.9428ZM54.5877 3.18182V9H53.9059L50.7354 4.43182H50.6786V9H49.9741V3.18182H50.6559L53.8377 7.76136H53.8945V3.18182H54.5877Z"
                    fill="grey"
                  />
                </svg>
              </label>
            </InputContainer>
          </SettingsSection>
          <SettingsSection>
            <SettingTitle>Difficulty</SettingTitle>
            <InputContainer>
              <label className="modeSelect">
                <input
                  className="easy"
                  type="radio"
                  name="difficulty"
                  id="easy"
                  value="easy"
                  checked={formValues.difficulty === 'easy'}
                  onChange={handleChange}
                  onMouseOver={pop}
                />
                <svg
                  width="65"
                  height="25"
                  viewBox="0 0 65 25"
                  fill="#6ccf4b85"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="64" height="24" fill="" />
                </svg>
              </label>
              <label className="difficultySelect">
                <input
                  className="medium"
                  type="radio"
                  name="difficulty"
                  value="medium"
                  checked={formValues.difficulty === 'medium'}
                  onChange={handleChange}
                  onMouseOver={pop}
                />
                <svg
                  width="65"
                  height="25"
                  viewBox="0 0 65 25"
                  fill="#eebd378d"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="64" height="24" fill="" />
                </svg>
              </label>
              <label className="difficultySelect">
                <input
                  className="hard"
                  type="radio"
                  name="difficulty"
                  value="hard"
                  checked={formValues.difficulty === 'hard'}
                  onChange={handleChange}
                  onMouseOver={pop}
                />
                <svg
                  width="65"
                  height="25"
                  viewBox="0 0 65 25"
                  fill="#f8515199"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="64" height="24" fill="" />
                </svg>
              </label>
            </InputContainer>
          </SettingsSection>
          <SettingsSection>
            <SettingTitle>Category</SettingTitle>
            <BoxContainers>
              <select
                className="box"
                type="dropdown"
                name="category"
                onChange={handleChange}
                onMouseOver={pop}
                defaultValue={'select'}
              >
                <option value="select" disabled>
                  Select
                </option>
                {categories.map((item, idx) => {
                  return (
                    <option key={idx} id={item} value={item} checked={formValues.category === item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </BoxContainers>
          </SettingsSection>
        </Form>
        <Button disabled={disabled} onClick={handleSubmit} onMouseOver={pop}>
          start
        </Button>
        <Errors>
          <Error>{formErrors.difficulty}</Error>
          <Error>{formErrors.category}</Error>
          <Error>{formErrors.mode}</Error>
        </Errors>
      </SettingsContainer>
    </Screen>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.stateReducer.isFetching,
  };
};

export default connect(mapStateToProps, {
  setData,
  setCategory,
  setMode,
  setName,
  fetchData,
})(Settings);

const SettingsContainer = styled.div`
  height: 90vh;
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  padding: 16px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 60vw;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 6% 0%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  @media (min-width: 600px) {
    width: 50%;
  }
`;

const SettingTitle = styled.h2`
  font-size: 1.5rem;
  color: orange;
  margin-bottom: 1%;
`;

const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
  padding: 10px 0%;
  box-sizing: border-box;

  label {
    flex: 1;
    cursor: pointer;
  }

  .box {
    height: 30px;
    width: 200px;
    text-align: center;
    color: ${({ theme }) => theme.text};
    background: transparent;

    &:focus {
      outline: 1px solid yellow;
    }
  }
`;

const BoxContainers = styled.div`
  display: flex;
  align-self: center;
  position: relative;

  input {
    text-align: center;
    color: ${({ theme }) => theme.text};
    background: transparent;
    box-sizing: border-box;

    &:focus {
      outline: 1px solid yellow;
    }
  }
`;

const Dice = styled.div`
  position: absolute;
  bottom: 7px;
  right: 8px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;

  input {
    flex: 1;
    position: absolute;
    opacity: 0;
  }

  //MODE
  input[class='mode']:hover + svg,
  input[class='mode']:checked + svg,
  input[class='mode']:focus + svg {
    stroke: ${({ theme }) => theme.text};
  }

  //DIFFICULTY
  input[class='easy']:hover + svg,
  input[class='easy']:checked + svg,
  input[class='easy']:focus + svg {
    fill: #23e123;
  }
  input[class='medium']:hover + svg,
  input[class='medium']:checked + svg,
  input[class='medium']:focus + svg {
    fill: #fba300;
  }
  input[class='hard']:hover + svg,
  input[class='hard']:checked + svg,
  input[class='hard']:focus + svg {
    fill: #f52525;
  }
`;

const Button = styled.button`
  width: 60%;
  height: 10%;
  margin: 5%;
  transition: ease 0.1s;
  cursor: pointer;

  &:enabled {
    box-shadow: 0 0 3px 1px #fff, 0 0 8px 4px #f0f, 0 0 10px 5px #0ff;
    transition: ease 0.3s;
  }

  &:hover,
  &:focus {
    background-color: #f4f6ed;
    box-shadow: 0 0 6px 3px #fff, 0 0 16px 8px #f0f, 0 0 20px 10px #0ff;
    transition: ease 0.1s;
  }
`;

const Errors = styled.div``;
const Error = styled.div`
  color: red;
`;
