jest.dontMock('../picture');

describe('Picture', function () {
    it('ratio', function () {
        var React = require('react/addons');
        var Picture = require('../picture');
        var TestUtils = React.addons.TestUtils;

        var picture = {
            src: 'data:image/png;base64,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'
        };
        var props = {
            width: 700,
            height: 400
        }
        props.aspect_ratio = props.width / props.height;
        var ratio = 1.7;
        var picture = TestUtils.renderIntoDocument(
            <Picture {...props} ratio={ratio} />
        );

        var img = TestUtils.findRenderedDOMComponentWithTag(picture, 'img');
        expect(img.src).toBe(picture.src);
    });
});
