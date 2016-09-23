import chai from "chai"
import jsdom from 'jsdom'
import chaiImmutable from "chai-immutable"

const doc = jsdom.jsdom("<!doctype html><html><body></body></html>")
const win = doc.defaultView

global.document = doc 
global.window = win

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);