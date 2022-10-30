export default {
    post: jest.fn(() => Promise.resolve({ data: null })),
    get: jest.fn(() => Promise.resolve({ data: [] })),
};