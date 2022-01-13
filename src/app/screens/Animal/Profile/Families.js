import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import Card from "../../../components/card/card";
import config from "../../../config/globalConfig";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import FamilyTreeAnimalModal from "./FamilyTreeAnimalModal";
import { useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../../redux/actions/loader_action";
import { getAnimals } from "../../../redux/actions/animal_action";

function Families(props) {
  const { names } = props;
  console.log(names.filter((n) => n));
  const [modalVisible, setmodalVisible] = useState(false);
  const dispatch = useDispatch();
  const [allanimals, setallanimals] = useState();
  const [existingAnimals, setExistingAnimal] = useState(
    [
      props.animal._id,
      props.animal.family?.parent1[0]?._id,
      props.animal.family?.parent2[0]?._id,
      ...props.animal.family?.children.map((e) => e._id),
    ].filter((e) => e)
  );
  console.log('existing animal in families');
  console.log(existingAnimals);
  const closeModal = () => { setmodalVisible(false); }

  useEffect(() => {
    console.log('getting data');
    getAnimalData();
  }, []);



  // GET ANIMAL DATA FOR FAMILY TREEE MODAL... 
  const getAnimalData = () => {
    dispatch(EnableLoader());
    dispatch(getAnimals()).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setallanimals(
          response.payload.data
        );
        // console.log('Response is : ');
        // console.log(response.payload.data
        //   ? response.payload.data
        // .filter((e) => !existingAnimals.includes(e._id))
        // .filter(
        //   (e) =>
        //     e.categoryId.parentId.name ===
        //     props.animal.categoryId.parentId.name
        // )
        //   : []);
      }
    });

  }





  return (
    <div>
      <Row justify="start">
        {names && names[0]
          ? names
            .filter((n) => n)
            .map((name) => (
              <Col>
                <Card
                  style={{ width: "400px", height: "218px", margin: "10px" }}
                >
                  <div style={{ textAlign: "center", borderRadius: 20 }}>
                    <img
                      src={
                        name.image
                          ? name.image
                          : require(`../../../../assets/images/familytree/Animal@2x.png`)
                      }
                      width={"70"}
                      alt="logo"
                    />{" "}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <b className="primary-text fs-130">{name.data?.name}</b>
                  </div>

                  <div id="outer" style={{ textAlign: "center" }}>
                    {name.data?.sex && (
                      <div class="inner">
                        <span
                          className="primary-contrast-background primary-color"
                          style={{ padding: "5px", borderRadius: "8px" }}
                        >
                          {name.data?.sex}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    style={{ border: "0.75px solid" }}
                    className="secondary-text"
                  ></div>
                  <Row type="flex" style={{ textAlign: "center" }}>
                    {/* <Col xs={24} sm={12}>
                                    <Link to={`/editemployee`} className="secondary-text" style={{ textAlign: "center" }}>Edit</Link>
                                </Col> */}
                    <Col xs={24} sm={24}>
                      <Link
                        onClick={() => props.removeAnimal(name)}
                        className="secondary-text"
                        style={{ textAlign: "center" }}
                      >
                        Remove
                        </Link>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          : null}

        {/* For parent...  */}
        {props.parent && names.length < 2 && (
          // <>
          // {names[0] ? () : ()}
          // </>
          <Col>
            <Card
              onClick={() => {
                console.log("add animal");
                setmodalVisible(true);
              }}
              style={{ width: "400px", height: "218px", margin: "10px" }}
            >
              <br />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                <PlusOutlined
                  style={{
                    background: "var(--primary-color)",
                    borderRadius: 20,
                    padding: 5,
                  }}
                />
              </div>
            </Card>
          </Col>
        )}


        {/* For child...  */}
        {props.child && (
          <Col>
            <Card
              onClick={() => {
                setmodalVisible(true);
              }}
              style={{ width: "400px", height: "218px", margin: "10px" }}
            >
              <br />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                <PlusOutlined
                  style={{
                    background: "var(--primary-color)",
                    borderRadius: 20,
                    padding: 5,
                  }}
                />
              </div>
            </Card>
          </Col>
        )}



      </Row>
      <FamilyTreeAnimalModal allanimals={allanimals ? allanimals.filter((e) => !props.existingAnimals.includes(e._id)).filter(
        (e) =>
          e.categoryId.name ===
          props.animal.categoryId.name
      ) : []}
        type={props.parent ? 'parent' : 'child'}
        refreshData={props.refreshData}
        addAnimal={props.addAnimal} animal={props.animal} visible={modalVisible} closeModal={closeModal} />
    </div>
  );
}

export default Families;
