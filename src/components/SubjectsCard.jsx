import React from "react";

function SubjectsCard( { _id, name, description } ) {
  return (
    <dl key={_id}>
      <dt>{name}</dt>
      <dd>{description}</dd>
    </dl>
  );
}

export default SubjectsCard;
