import jwt from 'jsonwebtoken';

function isJson(req, res, next) {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).json({ status: 400, msg: 'missing json content type' });
    return;
  } else {
    next();
  }
}
function isLength(req, res, next) {
  if (req.body.title.length > 140) {
    res
      .status(403)
      .json({ status: 403, msg: 'Task text should be 140 characters or less' });
    return;
  } else {
    next();
  }
}

function isGmail(req, res, next) {
  console.log(req.body);
  if (!req.body.email) {
    console.log('no email');
    res.status(403).json({ status: 403, msg: 'email must be gmail' });
    return;
  }
  if (!req.body.email.includes('@gmail.com')) {
    console.group('not gmail');
    res.status(403).json({ msg: 'email must be gmail' });
    return;
  }
  next();
}

export { isJson, isGmail, isLength };
