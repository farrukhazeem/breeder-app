import React from 'react';
import Families from './Families';
import { useDispatch } from 'react-redux';

function FamilyTree({ data, refreshData, existingAnimal }) {
    return (
        <div>
            <h2 className="heading-top smallCenter PrimaryWhiteSmall">Family Tree</h2>
            <div className="smallGallery">
                <div style={{ margin: 10 }}>
                    <h2 className="heading-top ">Parent</h2>
                    <br />
                    {data.family?.children && data.family?.children.length > 0 ?
                        <Families refreshData={refreshData} existingAnimals={existingAnimal} parent={true} animal={data} names={[data.family?.parent1[0], data.family?.parent2[0]].filter(n => n)} />
                        :
                        <h2 style={{}}>Parent is not added </h2>
                    }

                </div>


                <br />

                <div style={{ margin: 10 }}>
                    <h2 className="heading-top">Child</h2>
                    {data.family?.children && data.family?.children.length > 0 ?
                        <Families refreshData={refreshData} child={true} existingAnimals={existingAnimal} animal={data} names={data.family?.children} />
                        :
                        <h2 style={{}}>Child not added </h2>}
                </div>
            </div>
        </div>
    )
}

export default FamilyTree;

