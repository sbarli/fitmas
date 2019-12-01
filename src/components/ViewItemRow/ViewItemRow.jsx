import React from 'react';
import PropTypes from 'prop-types';
// components
import Label from '../../libs/ui/forms/Label/Label';
import Paragraph from '../../libs/ui/Paragraph/Paragraph';

// styled components
import styled from 'styled-components/macro';

const Row = styled.div(({ first }) => `
  ${!first ? 'margin-top: 1rem;' : ''}
  display: grid;
  grid-template-columns: 20% 20% 1fr;
`);

const ViewItemRow = ({ rowType, day, data, isFirst }) => {
  return (
    <Row first={isFirst}>
      <div>
        <Label>
          <input
            name={data.name}
            type="checkbox"
            value={`${data.done}`}
            checked={data.done}
            onChange={(e) => data.checkChange(rowType, data.name, e.target.checked)}
          />
        </Label>
      </div>
      <div>
        <Paragraph singleSpaced>{data.category}</Paragraph>
      </div>
      <div>
        <Paragraph singleSpaced>{data.items}</Paragraph>
      </div>
    </Row>
  );
};

ViewItemRow.defaultProps = {
  isFirst: false,
};

ViewItemRow.propTypes = {
  day: PropTypes.string.isRequired,
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    items: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    checkChange: PropTypes.func.isRequired,
  }).isRequired,
  rowType: PropTypes.oneOf([ 'food', 'exercise' ]).isRequired,
  isFirst: PropTypes.bool.isRequired,
};

export default ViewItemRow;
