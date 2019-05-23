import _ from 'lodash';

const handleResult = (data) => {
  const isOk = _.get(data, 'result.ok');
  if (isOk === 1) {
    return true;
  }
  return false;
};

export { handleResult };
