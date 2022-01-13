import React, { useEffect, useState } from "react";
import {
  Steps,
  Row,
  Col,
  Typography,
  message,
  Spin,
  Alert,
} from "antd";
import Button from "../../components/button/button";
import "./appwizard.scss";
import { useDispatch, useSelector } from "react-redux";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import { getForms } from "../../redux/actions/form_action";
import AddEmployeesWizard from "./AddEmployeesWizard";
import { getBreederEmployees, setupWizard } from "../../redux/actions/user_actions";
import passwordGenerator from "../../config/passwordGenerator";
import { getAnimals } from "../../redux/actions/animal_action";
import { getProduct } from "../../redux/actions/product_action";
const { Step } = Steps;
const { Title, Text } = Typography;


export default function AppWizard(props) {
  let user = useSelector(state => state.user?.userData?.data ? state.user.userData.data : {});
  const [isRepeated] = useState((props.location.state && props.location.state.isAllowed) ? true : false);
  const [current, setCurrent] = useState(0);
  const [stepper, setStepper] = useState(stepperConfig);

  const [error, setError] = useState(null);
  const [isNextClicked, setisNextClicked] = useState(false);

  const [allCategoriesForm, setAllCategoriesForm] = useState([]);

  const [categoriesForms, setCategoriesForms] = useState([]);
  const [selectedAnimalForms, setSelectedAnimalForms] = useState([]);
  const [selectedProductForm, setSelectedProductForm] = useState([]);
  const [categoryType, setCategoryType] = useState("animal");
  const [categoryTitle, setCategoryTitle] = useState(
    "Select the animals you deal in"
  );
  const [employeeArray, setEmployeeArray] = useState([]);
  const [products, setProduct] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [packageType, setpackageType] = useState("Business");

  const dispatch = useDispatch();
  useEffect(() => {
    getData();

  }, []);

  useEffect(() => {
    if (user?.subscriber?.subscriptionId?.packageType === "Individual") {
      setpackageType("Individual")
      setStepper(stepperConfigIndividual)
    }
    else { }
  }, [user]);



  const getAnimalsData = () => {
    console.log("fetchnig animal");
    return new Promise((resolve, reject) => {
      dispatch(getAnimals()).then((response) => {
        console.log(response);
        if (response.payload.status === 200) {
          setAnimal(response.payload.data);
          resolve(response.payload.data);
        }
      });
    });
  };

  const getProductsData = () => {
    return new Promise((resolve, reject) => {
      dispatch(getProduct()).then((response) => {
        console.log(response);
        if (response.payload.status === 200) {
          setProduct(response.payload.data);
          resolve(response.payload.data);
        }
      });
    });
  };

  const getEmployeeData = () => {
    console.log("fetchnig employee");
    return new Promise((resolve, reject) => {
      dispatch(getBreederEmployees()).then((response) => {
        console.log(response);
        if (response.payload.status === 200) {
          setEmployee(response.payload.data);
          resolve(response.payload.data);
        }
      });
    });
  };


  const getAnimalProductandEmployeeData = (forms) => {
    Promise.all([
      // getAnimalsData(),
      // getProductsData(),
      getEmployeeData(),
    ]).then(([myemployees]) => {
      console.log(myemployees);
      setSelectedAnimalForms(forms.filter(e => ((e.categoryId.type === 'animal') && e.breedersId.includes(localStorage.getItem('userId')))));
      setSelectedProductForm(forms.filter(e => ((e.categoryId.type === 'product') && e.breedersId.includes(localStorage.getItem('userId')))))
      setEmployeeArray(myemployees);
    });
  }

  const animalTab = () => {
    setCategoryType("animal");
    setCategoriesForms(
      allCategoriesForm.filter((e) => e.categoryId.type === "animal")
    );
    setCategoryTitle("Select the animals you deal in");
  };

  const productTab = () => {
    setCategoryType("product");
    setCategoriesForms(
      allCategoriesForm.filter((e) => e.categoryId.type === "product")
    );
    setCategoryTitle("Select the products you offer");
  };

  const gotoNext = (current, type) => {
    console.log("next ", current);

    if (packageType === "Individual") {
      setStepper(stepperConfigIndividual);
    }
    else {
      if (current === 0) {
        productTab();
      }
      stepperConfig[current].status = type;
      stepperConfig[current + 1].status = "process";
      setStepper(stepperConfig);
    }

    setCurrent(current + 1);
  };

  const getData = () => {
    dispatch(EnableLoader());
    dispatch(getForms("")).then((response) => {

      console.log(response);
      if (response.payload.status === 200) {
        setAllCategoriesForm(response.payload.data);
        setCategoriesForms(
          response.payload.data.filter((e) => e.categoryId.type === "animal")
        );
        setCategoryType("animal");
        if (isRepeated) {
          getAnimalProductandEmployeeData(response.payload.data);
        }
      }
      setloader(false)
      // dispatch(DisableLoader());
    });
  };

  const onChange = (current) => {
    console.log("onChange:", current);
    if (current === 1) {
      productTab();
    } else if (current === 0) {
      animalTab();
    }
    setCurrent(current);
  };

  function NavigationFooter(props) {
    console.log(props);
    const { next, skip, confirm, back } = props;
    return (
      <div className="footer-body">
        {current !== 0 ?
          <Button disabled={current === 0} onClick={back}>
            Back
        </Button>
          :
          <div></div>
        }

        {
          current !== stepper.length - 1 ? (
            <Button onClick={skip}>Skip</Button>
          ) : (
              null
            )
        }

        {
          current === stepper.length - 1 ? (
            <Button onClick={next}>Submit</Button>
          ) : (
              <Button onClick={next}>Next</Button>
            )
        }
      </div >
    );
  }

  const removeDuplicates = () => {
    let arr = employeeArray.filter(e => (e.name && e.email)).map(e => ({ ...e, password: passwordGenerator.generate(10) }))
    var res = arr.reduce((acc, obj) => {
      var exist = acc.find(({ email }) => obj.email === email);
      if (!exist) { acc.push(obj); }
      else {
        message.info("same employee email found! only unique emails will be saved")
      }
      return acc;
    }, []);
    return res
  }

  const goToNext = async () => {
    if (packageType !== "Individual") {
      if (current === 0 || current === 1) {
        setisNextClicked(true);
        const currForm =
          categoryType === "animal" ? selectedAnimalForms : selectedProductForm;
        if (!currForm[0]) {
          setError("Atleast one category should be selected!");
          return;
        } else {
          setError(null);
          gotoNext(current, "finish");
        }
      } else if (current === 2) {
        const data = {
          employeeArray: await removeDuplicates(),//employeeArray.filter(e => (e.name && e.email)).map(e => ({ ...e, password: passwordGenerator.generate(10) })),
          selectedAnimalForms: selectedAnimalForms.map((e) => e._id),
          selectedProductForm: selectedProductForm.map((e) => e._id),
        };
        // console.log("submit values");
        // console.log(selectedAnimalForms.map((e) => e._id));
        // console.log(selectedProductForm.map((e) => e._id));
        // console.log(employeeArray);
        dispatch(EnableLoader());
        dispatch(setupWizard(data)).then((response) => {
          // dispatch(DisableLoader());
          console.log(response);
          if (response.payload.status === 200) {
            message.success(response.payload.message);
            props.history.push('/dashboard')
          }
        })
      }
    }
    else {
      if (current === 0) {
        setisNextClicked(true);
        const currForm =
          categoryType === "animal" ? selectedAnimalForms : selectedProductForm;
        if (!currForm[0]) {
          setError("Atleast one category should be selected!");
          return;
        } else {
          setError(null);
          gotoNext(current, "finish");
        }
      } else if (current === 1) {
        const data = {
          employeeArray: employeeArray.filter(e => (e.name && e.email)).map(e => ({ ...e, password: passwordGenerator.generate(10) })),
          selectedAnimalForms: selectedAnimalForms.map((e) => e._id),
          selectedProductForm: selectedProductForm.map((e) => e._id),
        };
        // console.log("submit values");
        // console.log(selectedAnimalForms.map((e) => e._id));
        // console.log(selectedProductForm.map((e) => e._id));
        // console.log(employeeArray);
        dispatch(EnableLoader());
        dispatch(setupWizard(data)).then((response) => {
          // dispatch(DisableLoader());
          console.log(response);
          if (response.payload.status === 200) {
            message.success(response.payload.message);
            props.history.push('/dashboard')
          }
        })
      }
    }
  };

  const clickOnSkip = () => {
    if (current === 0 || current === 1) {
      setError(null);
      gotoNext(current, "skip");
    }
  };

  const clickOnBack = () => {
    console.log("back");
    console.log(current - 1);
    setCurrent(current - 1);
    onChange(current - 1);
  };

  const [loader, setloader] = useState(true)

  return (
    <Spin size="large" style={{ position: 'fixed', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }} spinning={loader}>
      <div className="mainBody">
        <Title className={'mainHeading'} level={2}>Setup Wizard</Title>
        <hr />
        <Steps
          type="navigation"
          size="small"
          current={current}
          onChange={onChange}
          className="site-navigation-steps"
        >
          {stepper.map((step, key) => (
            <Step
              key={key}
              status={step.status}
              title={step.title}
              disabled={step.status === "wait" ? true : false}
            />
          ))}
        </Steps>

        {stepper
          .filter((_, idx) => idx === current)
          .map((step, key) =>
            step.stepperBody({
              current,
              gotoNext,
              categoriesForms,
              selectedCategoriesForm:
                categoryType === "animal"
                  ? selectedAnimalForms
                  : selectedProductForm,
              setSelectedCategoriesForm:
                categoryType === "animal"
                  ? setSelectedAnimalForms
                  : setSelectedProductForm,
              categoryType,
              categoryTitle,
              employeeArray,
              setEmployeeArray,
              isNextClicked,
              error,
            })
          )}

        <NavigationFooter
          // selectedAnimals={selectedAnimals}
          current={current}
          next={goToNext}
          confirm={current === stepper.length - 1 ? true : false}
          skip={clickOnSkip}
          back={clickOnBack}
        // submit={submitSale}
        />
      </div>
    </Spin>
  );
}


function AnimalInfoStep(props) {
  const {
    categoriesForms,
    setSelectedCategoriesForm,
    selectedCategoriesForm,
    categoryType,
    gotoNext,
    current,
    categoryTitle,
    isNextClicked,
    error,
  } = props;

  const selectCategory = (form) => {
    if (selectedCategoriesForm.filter((e) => e._id === form._id)[0]) {
      setSelectedCategoriesForm(
        selectedCategoriesForm.filter((e) => !(e._id === form._id))
      );
    } else {
      setSelectedCategoriesForm([...selectedCategoriesForm, ...[form]]);
    }
  };

  //   const next = () => {
  //     setisNextClicked(true);
  //     if (!selectedCategoriesForm[0]) {
  //       setError("Atleast one category should be selected!");
  //       return;
  //     } else {
  //       setError(null);
  //       gotoNext(current, "finish");
  //     }
  //   };

  return (
    <div className="inner-stepper-body">
      <Title level={3}>{categoryTitle}</Title>
      {isNextClicked && error && (
        <Alert message={error} type="error" className={"alert-custom"} />
      )}

      <div className="stepper-animal-button">
        <Row justify={'center'} gutter={10}>
          {categoriesForms.map((category) => (
            <Col className="animal-col">
              <Button
                onClick={() => selectCategory(category)}
                className={
                  selectedCategoriesForm.filter(
                    (e) => e._id === category._id
                  )[0]
                    ? ""
                    : "customButtonAnimal primary-contrast-background primary-contrast-text-important"
                }
              >
                {category.categoryId.name}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
      {/* <div className="stepper-animal-action-buttons">
        <Space direction={"horizontal"}>
          <Button onClick={skip} className="skip-btn">
            Skip
          </Button>
          <Button onClick={next}>Save</Button>
        </Space>
      </div> */}
    </div>
  );
}

let stepperConfig = [
  {
    title: "Animal Info",
    status: "process",
    stepperBody: (props) => <AnimalInfoStep {...props} />,
  },
  {
    title: "Selet Products",
    status: "wait",
    stepperBody: (props) => <AnimalInfoStep {...props} />,
  },
  {
    title: "Team Members",
    status: "wait",
    stepperBody: employeesStep,
  },
];


let stepperConfigIndividual = [
  {
    title: "Animal Info",
    status: "process",
    stepperBody: (props) => <AnimalInfoStep {...props} />,
  },
  {
    title: "Team Members",
    status: "wait",
    stepperBody: employeesStep,
  },
];


function employeesStep(props) {
  return <AddEmployeesWizard {...props} />;
}