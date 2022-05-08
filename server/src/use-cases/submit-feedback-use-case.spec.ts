import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submit = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
); 

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submit.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,234324sada32423'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    }); 

    it('should not be able to submit a feedback without a type', async () => {
        await expect(submit.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,234324sada32423'
        })).rejects.toThrow();
    }); 

    it('should not be able to submit a feedback without comment', async () => {
        await expect(submit.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,234324sada32423'
        })).rejects.toThrow();
    }); 

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submit.execute({
            type: 'BUG',
            comment: 'comentário teste',
            screenshot: 'teste.jpg'
        })).rejects.toThrow();
    }); 
});